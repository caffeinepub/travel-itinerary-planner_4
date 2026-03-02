import { useState } from 'react';
import { Plus, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAddActivity } from '../hooks/useQueries';
import { toast } from 'sonner';

interface AddActivityFormProps {
  itineraryId: bigint;
  dayIndex: number;
  onClose: () => void;
}

export default function AddActivityForm({ itineraryId, dayIndex, onClose }: AddActivityFormProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const addActivity = useAddActivity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Activity title is required');
      return;
    }
    try {
      await addActivity.mutateAsync({
        itineraryId,
        dayIndex: BigInt(dayIndex),
        title: title.trim(),
        time: time.trim(),
        location: location.trim(),
        notes: notes.trim(),
      });
      toast.success('Activity added!');
      onClose();
    } catch {
      toast.error('Failed to add activity');
    }
  };

  return (
    <Card className="border border-primary/30 bg-card shadow-warm animate-fade-in">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold font-body text-foreground">
            Add Activity
          </CardTitle>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-muted-foreground"
            onClick={onClose}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Title *</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Visit the Colosseum"
              className="h-8 text-sm"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Time</Label>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 10:00 AM"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs font-medium text-muted-foreground">Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="h-8 text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs font-medium text-muted-foreground">Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              className="text-sm min-h-[60px] resize-none"
            />
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="submit"
              size="sm"
              disabled={addActivity.isPending}
              className="gap-1.5 h-8"
            >
              {addActivity.isPending ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              Add Activity
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onClose}
              disabled={addActivity.isPending}
              className="h-8"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
