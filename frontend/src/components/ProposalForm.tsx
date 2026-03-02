import { useState } from 'react';
import { CheckCircle2, Loader2, Send, User, Mail, MapPin, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSubmitProposal } from '../hooks/useQueries';

interface FormState {
  requesterName: string;
  email: string;
  destination: string;
  preferredStartDate: string;
  preferredEndDate: string;
  notes: string;
}

const initialForm: FormState = {
  requesterName: '',
  email: '',
  destination: '',
  preferredStartDate: '',
  preferredEndDate: '',
  notes: '',
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ProposalForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const submitProposal = useSubmitProposal();

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.requesterName.trim()) newErrors.requesterName = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!form.destination.trim()) newErrors.destination = 'Destination is required';
    if (!form.preferredStartDate) newErrors.preferredStartDate = 'Start date is required';
    if (!form.preferredEndDate) {
      newErrors.preferredEndDate = 'End date is required';
    } else if (
      form.preferredStartDate &&
      new Date(form.preferredEndDate) < new Date(form.preferredStartDate)
    ) {
      newErrors.preferredEndDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await submitProposal.mutateAsync({
        requesterName: form.requesterName.trim(),
        email: form.email.trim(),
        destination: form.destination.trim(),
        preferredStartDate: new Date(form.preferredStartDate),
        preferredEndDate: new Date(form.preferredEndDate),
        notes: form.notes.trim(),
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      // Error toast handled in mutation's onError
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-6 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-forest-600" />
        </div>
        <h3 className="font-display text-xl font-bold text-foreground mb-2">
          Proposal Submitted!
        </h3>
        <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed mb-6">
          Thank you! Your custom itinerary request has been received. We'll be in touch at{' '}
          <strong className="text-foreground">{form.email || 'your email'}</strong> soon.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
          className="font-body"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="proposal-name" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <User className="w-3.5 h-3.5 text-primary" />
            Your Name *
          </Label>
          <Input
            id="proposal-name"
            value={form.requesterName}
            onChange={(e) => updateField('requesterName', e.target.value)}
            placeholder="Jane Smith"
            className={errors.requesterName ? 'border-destructive' : ''}
          />
          {errors.requesterName && (
            <p className="text-xs text-destructive font-body">{errors.requesterName}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="proposal-email" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Mail className="w-3.5 h-3.5 text-primary" />
            Email Address *
          </Label>
          <Input
            id="proposal-email"
            type="email"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="jane@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-xs text-destructive font-body">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-1.5">
        <Label htmlFor="proposal-destination" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          Dream Destination *
        </Label>
        <Input
          id="proposal-destination"
          value={form.destination}
          onChange={(e) => updateField('destination', e.target.value)}
          placeholder="e.g. Kyoto, Japan or Patagonia, Argentina"
          className={errors.destination ? 'border-destructive' : ''}
        />
        {errors.destination && (
          <p className="text-xs text-destructive font-body">{errors.destination}</p>
        )}
      </div>

      {/* Dates Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="proposal-start" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Preferred Start Date *
          </Label>
          <Input
            id="proposal-start"
            type="date"
            value={form.preferredStartDate}
            onChange={(e) => updateField('preferredStartDate', e.target.value)}
            className={errors.preferredStartDate ? 'border-destructive' : ''}
          />
          {errors.preferredStartDate && (
            <p className="text-xs text-destructive font-body">{errors.preferredStartDate}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="proposal-end" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            Preferred End Date *
          </Label>
          <Input
            id="proposal-end"
            type="date"
            value={form.preferredEndDate}
            min={form.preferredStartDate}
            onChange={(e) => updateField('preferredEndDate', e.target.value)}
            className={errors.preferredEndDate ? 'border-destructive' : ''}
          />
          {errors.preferredEndDate && (
            <p className="text-xs text-destructive font-body">{errors.preferredEndDate}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <Label htmlFor="proposal-notes" className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <FileText className="w-3.5 h-3.5 text-primary" />
          Additional Notes
        </Label>
        <Textarea
          id="proposal-notes"
          value={form.notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Tell us about your travel style, interests, budget, group size, or any special requirements…"
          className="min-h-[100px] resize-none font-body"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={submitProposal.isPending}
        className="w-full gap-2 font-body font-semibold"
        size="lg"
      >
        {submitProposal.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit My Request
          </>
        )}
      </Button>
    </form>
  );
}
