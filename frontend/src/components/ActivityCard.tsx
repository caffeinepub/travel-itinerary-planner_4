import { useState } from 'react';
import { Clock, MapPin, FileText, Pencil, Trash2, Check, X, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { Activity } from '../backend';
import { useUpdateActivity, useDeleteActivity } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ActivityCardProps {
  activity: Activity;
  itineraryId: bigint;
  dayIndex: number;
}

export default function ActivityCard({ activity, itineraryId, dayIndex }: ActivityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(activity.title);
  const [editTime, setEditTime] = useState(activity.time);
  const [editLocation, setEditLocation] = useState(activity.location);
  const [editNotes, setEditNotes] = useState(activity.notes);

  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();

  const handleSave = async () => {
    if (!editTitle.trim()) {
      toast.error('Activity title is required');
      return;
    }
    try {
      await updateActivity.mutateAsync({
        itineraryId,
        dayIndex: BigInt(dayIndex),
        activityId: activity.id,
        title: editTitle.trim(),
        time: editTime.trim(),
        location: editLocation.trim(),
        notes: editNotes.trim(),
      });
      toast.success('Activity updated');
      setIsEditing(false);
    } catch {
      toast.error('Failed to update activity');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteActivity.mutateAsync({
        itineraryId,
        dayIndex: BigInt(dayIndex),
        activityId: activity.id,
      });
      toast.success('Activity removed');
    } catch {
      toast.error('Failed to delete activity');
    }
  };

  const handleCancel = () => {
    setEditTitle(activity.title);
    setEditTime(activity.time);
    setEditLocation(activity.location);
    setEditNotes(activity.notes);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="border border-primary/30 bg-card shadow-xs animate-fade-in">
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Title *</Label>
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Activity title"
              className="h-8 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Time</Label>
              <Input
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
                placeholder="e.g. 9:00 AM"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Location</Label>
              <Input
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Location"
                className="h-8 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Notes</Label>
            <Textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Additional notes..."
              className="text-sm min-h-[60px] resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={updateActivity.isPending}
              className="gap-1.5 h-8"
            >
              {updateActivity.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={updateActivity.isPending}
              className="gap-1.5 h-8"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group border border-border hover:border-primary/30 transition-all duration-200 bg-card shadow-xs">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-foreground font-body mb-2">
              {activity.title}
            </h4>
            <div className="space-y-1">
              {activity.time && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary shrink-0" />
                  <span>{activity.time}</span>
                </div>
              )}
              {activity.location && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                  <span className="truncate">{activity.location}</span>
                </div>
              )}
              {activity.notes && (
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground mt-1.5">
                  <FileText className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{activity.notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-3.5 h-3.5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove "{activity.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {deleteActivity.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Delete'
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
