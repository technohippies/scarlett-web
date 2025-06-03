import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocale } from "@/contexts/LocaleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Flashcard {
  id: string;
  front_text: string;
  front_phonetic_guide?: string;
  back_text: string;
  back_phonetic_guide?: string;
  notes?: string;
  attributes?: any;
}

export interface SubmitDeckFormData {
  name: string;
  description: string;
  frontLanguage: string;
  backLanguage: string;
  inputMode: 'manual' | 'csv';
  flashcards: Flashcard[];
  csvFile?: File;
}

export interface SubmitDeckPageProps {
  onSubmit?: (data: SubmitDeckFormData) => void;
  isSubmitting?: boolean;
}

const createEmptyCard = (): Flashcard => ({
  id: Math.random().toString(36).substr(2, 9),
  front_text: "",
  front_phonetic_guide: "",
  back_text: "",
  back_phonetic_guide: "",
  notes: "",
});

const createEmptyFormData = (): SubmitDeckFormData => ({
  name: "",
  description: "",
  frontLanguage: "en",
  backLanguage: "vi",
  inputMode: 'manual',
  flashcards: Array.from({ length: 5 }, createEmptyCard),
});

export const SubmitDeckPage: React.FC<SubmitDeckPageProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const { t } = useLocale();
  const [formData, setFormData] = useState<SubmitDeckFormData>(createEmptyFormData());
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (field: keyof SubmitDeckFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCardChange = (cardId: string, field: keyof Flashcard, value: string) => {
    setFormData(prev => ({
      ...prev,
      flashcards: prev.flashcards.map(card =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    }));
  };

  const addCard = () => {
    setFormData(prev => ({
      ...prev,
      flashcards: [...prev.flashcards, createEmptyCard()]
    }));
  };

  const removeCard = (cardId: string) => {
    if (formData.flashcards.length <= 5) return;
    setFormData(prev => ({
      ...prev,
      flashcards: prev.flashcards.filter(card => card.id !== cardId)
    }));
  };

  const handleCsvChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, csvFile: file || undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.description.trim()) newErrors.description = t.required;
    
    if (formData.inputMode === 'manual') {
      const validCards = formData.flashcards.filter(card => 
        card.front_text.trim() && card.back_text.trim()
      );
      if (validCards.length < 5) {
        newErrors.flashcards = t.minimumCardsRequired;
      }
    } else if (formData.inputMode === 'csv' && !formData.csvFile) {
      newErrors.csv = t.csvFileRequired;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.submitDeck}</h1>
        <p className="text-muted-foreground">
          {t.createFlashcardDeck}{' '}
          <a 
            href="https://docs.base.org/chain/network-faucets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {t.networkFaucets}
          </a>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Deck Info */}
        <div className="space-y-4">
          <div>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder={t.deckName}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder={t.briefDescription}
              disabled={isSubmitting}
              rows={2}
              aria-invalid={!!errors.description}
            />
            {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={formData.frontLanguage}
              onValueChange={(value) => handleInputChange("frontLanguage", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.frontLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.english}</SelectItem>
                <SelectItem value="vi">{t.vietnamese}</SelectItem>
                <SelectItem value="zh">{t.mandarin}</SelectItem>
                <SelectItem value="de">{t.german}</SelectItem>
                <SelectItem value="it">{t.italian}</SelectItem>
                <SelectItem value="pt">{t.portuguese}</SelectItem>
                <SelectItem value="ru">{t.russian}</SelectItem>
                <SelectItem value="ja">{t.japanese}</SelectItem>
                <SelectItem value="ko">{t.korean}</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.backLanguage}
              onValueChange={(value) => handleInputChange("backLanguage", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.backLanguage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">{t.english}</SelectItem>
                <SelectItem value="vi">{t.vietnamese}</SelectItem>
                <SelectItem value="zh">{t.mandarin}</SelectItem>
                <SelectItem value="de">{t.german}</SelectItem>
                <SelectItem value="it">{t.italian}</SelectItem>
                <SelectItem value="pt">{t.portuguese}</SelectItem>
                <SelectItem value="ru">{t.russian}</SelectItem>
                <SelectItem value="ja">{t.japanese}</SelectItem>
                <SelectItem value="ko">{t.korean}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Input Mode */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">{t.inputMethod}</label>
            <Select
              value={formData.inputMode}
              onValueChange={(value: 'manual' | 'csv') => handleInputChange("inputMode", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">{t.manualEntry}</SelectItem>
                <SelectItem value="csv">{t.csvUpload}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Content Input */}
        {formData.inputMode === 'csv' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border/30 rounded-lg p-8 text-center hover:border-border/60 transition-colors bg-card/10 hover:bg-card/20">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleCsvChange(e.target.files?.[0] || null)}
                className="hidden"
                id="csv-upload"
                disabled={isSubmitting}
              />
              <label htmlFor="csv-upload" className="cursor-pointer">
                <div className="text-lg mb-2">{t.dropCsvOrClick}</div>
                <div className="text-sm text-muted-foreground">{t.csvFormat}</div>
              </label>
            </div>
            {formData.csvFile && (
              <p className="text-sm text-muted-foreground">File: {formData.csvFile.name}</p>
            )}
            {errors.csv && <p className="text-sm text-destructive">{errors.csv}</p>}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{t.flashcards}</h2>
            </div>

            {formData.flashcards.map((card, index) => (
              <div key={card.id} className="border border-neutral-700 rounded-lg p-6 space-y-4 relative bg-neutral-900/20 hover:bg-neutral-900/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-muted-foreground">{t.card} {index + 1}</h3>
                  {formData.flashcards.length > 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCard(card.id)}
                                              disabled={isSubmitting}
                      >
                        {t.remove}
                      </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      value={card.front_text}
                      onChange={(e) => handleCardChange(card.id, 'front_text', e.target.value)}
                      placeholder={t.frontText}
                      disabled={isSubmitting}
                    />
                    <Input
                      value={card.front_phonetic_guide || ''}
                      onChange={(e) => handleCardChange(card.id, 'front_phonetic_guide', e.target.value)}
                      placeholder={t.phoneticGuideOptional}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      value={card.back_text}
                      onChange={(e) => handleCardChange(card.id, 'back_text', e.target.value)}
                      placeholder={t.backText}
                      disabled={isSubmitting}
                    />
                    <Input
                      value={card.back_phonetic_guide || ''}
                      onChange={(e) => handleCardChange(card.id, 'back_phonetic_guide', e.target.value)}
                      placeholder={t.phoneticGuideOptional}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <Textarea
                    value={card.notes || ''}
                    onChange={(e) => handleCardChange(card.id, 'notes', e.target.value)}
                    placeholder={t.notesOptional}
                    disabled={isSubmitting}
                    rows={2}
                  />
                </div>
              </div>
            ))}
            
            {errors.flashcards && <p className="text-sm text-destructive">{errors.flashcards}</p>}
            
            <Button
              type="button"
              variant="outline"
              onClick={addCard}
              disabled={isSubmitting}
              className="w-full h-10"
            >
              {t.addCard}
            </Button>
          </div>
        )}

        {/* Submit */}
        <div className="border-t border-border/50 pt-6">
          <Button 
            type="submit" 
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground" 
            disabled={isSubmitting}
          >
            {isSubmitting ? t.submitting : t.submitDeck}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDeckPage; 