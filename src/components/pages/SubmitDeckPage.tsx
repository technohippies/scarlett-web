import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.description.trim()) newErrors.description = "Required";
    
    if (formData.inputMode === 'manual') {
      const validCards = formData.flashcards.filter(card => 
        card.front_text.trim() && card.back_text.trim()
      );
      if (validCards.length < 5) {
        newErrors.flashcards = "Minimum 5 complete cards required";
      }
    } else if (formData.inputMode === 'csv' && !formData.csvFile) {
      newErrors.csv = "CSV file required";
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
        <h1 className="text-3xl font-bold mb-2">Submit Deck</h1>
        <p className="text-muted-foreground">
          Create flashcard deck for testnet review. You'll need Base Sepolia ETH, which can be acquired freely from{' '}
          <a 
            href="https://docs.base.org/chain/network-faucets" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            network faucets
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
              placeholder="Deck name"
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description"
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
                <SelectValue placeholder="Front Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Vietnamese</SelectItem>
                <SelectItem value="zh">Mandarin</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.backLanguage}
              onValueChange={(value) => handleInputChange("backLanguage", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Back Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="vi">Vietnamese</SelectItem>
                <SelectItem value="zh">Mandarin</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
                <SelectItem value="ru">Russian</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Input Mode */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Input Method</label>
            <Select
              value={formData.inputMode}
              onValueChange={(value: 'manual' | 'csv') => handleInputChange("inputMode", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">✍️ Manual Entry</SelectItem>
                <SelectItem value="csv">📄 CSV Upload</SelectItem>
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
                <div className="text-lg mb-2">📄 Drop CSV or click to upload</div>
                <div className="text-sm text-muted-foreground">Format: front_text,back_text,front_phonetic_guide,back_phonetic_guide,notes</div>
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
              <h2 className="text-xl font-semibold">Flashcards</h2>
            </div>

            {formData.flashcards.map((card, index) => (
              <div key={card.id} className="border border-neutral-700 rounded-lg p-6 space-y-4 relative bg-neutral-900/20 hover:bg-neutral-900/30 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-muted-foreground">Card {index + 1}</h3>
                  {formData.flashcards.length > 5 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeCard(card.id)}
                      disabled={isSubmitting}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      value={card.front_text}
                      onChange={(e) => handleCardChange(card.id, 'front_text', e.target.value)}
                      placeholder="Front text"
                      disabled={isSubmitting}
                    />
                    <Input
                      value={card.front_phonetic_guide || ''}
                      onChange={(e) => handleCardChange(card.id, 'front_phonetic_guide', e.target.value)}
                      placeholder="Phonetic guide (optional)"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Input
                      value={card.back_text}
                      onChange={(e) => handleCardChange(card.id, 'back_text', e.target.value)}
                      placeholder="Back text"
                      disabled={isSubmitting}
                    />
                    <Input
                      value={card.back_phonetic_guide || ''}
                      onChange={(e) => handleCardChange(card.id, 'back_phonetic_guide', e.target.value)}
                      placeholder="Phonetic guide (optional)"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <Textarea
                    value={card.notes || ''}
                    onChange={(e) => handleCardChange(card.id, 'notes', e.target.value)}
                    placeholder="Notes (optional)"
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
              + Add Card
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
            {isSubmitting ? "Submitting..." : "Submit Deck"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitDeckPage; 