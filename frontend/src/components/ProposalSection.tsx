import { useState } from 'react';
import { MessageSquarePlus, ChevronDown, ChevronUp, Compass, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProposalForm from './ProposalForm';

const perks = [
  {
    icon: <Compass className="w-5 h-5 text-terracotta-600" />,
    title: 'Tailored to You',
    desc: 'Every itinerary is crafted around your interests, pace, and travel style.',
  },
  {
    icon: <Clock className="w-5 h-5 text-terracotta-600" />,
    title: 'Quick Turnaround',
    desc: 'Receive your custom plan within 48 hours of submitting your request.',
  },
  {
    icon: <Star className="w-5 h-5 text-terracotta-600" />,
    title: 'Expert Curation',
    desc: 'Hidden gems, local favorites, and insider tips you won\'t find in guidebooks.',
  },
];

export default function ProposalSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-sand-100 border-y border-sand-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center mx-auto mb-4">
              <MessageSquarePlus className="w-6 h-6 text-terracotta-600" />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Request a Custom Itinerary
            </h2>
            <p className="text-muted-foreground font-body text-base max-w-xl mx-auto leading-relaxed">
              Want a personalized travel plan crafted just for you? Tell us your dream destination and we'll create a bespoke itinerary tailored to your preferences.
            </p>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="bg-card rounded-xl p-4 border border-sand-300 shadow-card text-center"
              >
                <div className="w-10 h-10 rounded-full bg-terracotta-50 flex items-center justify-center mx-auto mb-3">
                  {perk.icon}
                </div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-1">
                  {perk.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Toggle Button */}
          {!isOpen && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setIsOpen(true)}
                className="gap-2 font-body font-semibold px-8 shadow-warm"
              >
                <MessageSquarePlus className="w-5 h-5" />
                Request a Custom Itinerary
              </Button>
            </div>
          )}

          {/* Collapsible Form */}
          {isOpen && (
            <div className="bg-card rounded-2xl border border-sand-300 shadow-card overflow-hidden animate-fade-in">
              {/* Form Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-sand-200 bg-sand-50">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Your Custom Itinerary Request
                  </h3>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">
                    Fill in the details below and we'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-sand-200 transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close form"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <div className="p-6">
                <ProposalForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
