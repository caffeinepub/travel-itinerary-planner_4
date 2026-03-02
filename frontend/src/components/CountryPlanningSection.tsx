import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Globe, ChevronDown, Search, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { COUNTRIES } from '../data/countries';
import { useGenerateSampleItinerary } from '../hooks/useQueries';
import { toast } from 'sonner';

export default function CountryPlanningSection() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [error, setError] = useState('');

  const generateSample = useGenerateSampleItinerary();

  const handleStartPlanning = () => {
    if (!selectedCountry) {
      setError('Please select a country to continue.');
      return;
    }
    setError('');
    navigate({ to: '/itinerary/new', search: { destination: selectedCountry } });
  };

  const handleGenerateSample = async () => {
    if (!selectedCountry) {
      setError('Please select a country to generate a sample itinerary.');
      return;
    }
    setError('');
    try {
      const newId = await generateSample.mutateAsync(selectedCountry);
      navigate({ to: '/itinerary/$id', params: { id: newId.toString() } });
    } catch {
      // Error toast is handled in the mutation's onError
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-terracotta-600 to-terracotta-700">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-5">
            <Globe className="w-7 h-7 text-white" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            Plan an Itinerary for a Country
          </h2>
          <p className="text-terracotta-100 font-body text-base md:text-lg mb-8 leading-relaxed">
            Choose your destination and we'll help you build the perfect day-by-day travel plan.
          </p>

          {/* Dropdown + Buttons */}
          <div className="flex flex-col gap-3 items-stretch max-w-lg mx-auto">
            {/* Combobox */}
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    aria-expanded={open}
                    className={`
                      w-full flex items-center justify-between gap-2
                      bg-white text-foreground
                      px-4 py-3 rounded-xl border-2
                      font-body text-sm text-left
                      transition-all duration-150
                      shadow-warm
                      ${error ? 'border-red-400' : 'border-white/80 hover:border-terracotta-300 focus:border-terracotta-400'}
                      focus:outline-none focus:ring-2 focus:ring-white/50
                    `}
                    onClick={() => setError('')}
                  >
                    <span className={selectedCountry ? 'text-foreground' : 'text-muted-foreground'}>
                      {selectedCountry || 'Select a country…'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] p-0 shadow-warm border border-border"
                  align="start"
                  sideOffset={4}
                >
                  <Command>
                    <div className="flex items-center border-b border-border px-3">
                      <Search className="w-4 h-4 text-muted-foreground mr-2 shrink-0" />
                      <CommandInput
                        placeholder="Search countries…"
                        className="border-0 focus:ring-0 h-10 font-body text-sm"
                      />
                    </div>
                    <CommandList className="max-h-60">
                      <CommandEmpty className="py-4 text-center text-sm text-muted-foreground font-body">
                        No country found.
                      </CommandEmpty>
                      <CommandGroup>
                        {COUNTRIES.map((country) => (
                          <CommandItem
                            key={country}
                            value={country}
                            onSelect={(val) => {
                              setSelectedCountry(val);
                              setOpen(false);
                              setError('');
                            }}
                            className="font-body text-sm cursor-pointer"
                          >
                            {country}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Inline validation */}
              {error && (
                <p className="mt-1.5 text-xs text-red-200 font-body text-left pl-1">
                  {error}
                </p>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Start Planning Button */}
              <Button
                size="lg"
                onClick={handleStartPlanning}
                disabled={generateSample.isPending}
                className="gap-2 bg-white text-terracotta-700 hover:bg-sand-100 hover:text-terracotta-800 border-0 shadow-warm font-body font-semibold px-6 flex-1"
              >
                Start Planning
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Generate Sample Button */}
              <Button
                size="lg"
                onClick={handleGenerateSample}
                disabled={generateSample.isPending || !selectedCountry}
                className={`gap-2 border-2 border-white/70 font-body font-semibold px-6 flex-1 transition-all duration-200 ${
                  selectedCountry
                    ? 'bg-white/15 text-white hover:bg-white/25 hover:border-white'
                    : 'bg-white/5 text-white/50 border-white/30 cursor-not-allowed'
                }`}
              >
                {generateSample.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Sample
                  </>
                )}
              </Button>
            </div>

            {/* Helper text for generate button */}
            {selectedCountry && (
              <p className="text-terracotta-100/80 text-xs font-body text-center animate-fade-in">
                ✨ Generate a ready-made 7-day sample itinerary for <strong className="text-white">{selectedCountry}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
