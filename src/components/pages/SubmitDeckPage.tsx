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
  front_image_cid?: string;
  front_audio_cid?: string;
  front_phonetic_guide?: string;
  back_text: string;
  back_image_cid?: string;
  back_audio_cid?: string;
  back_phonetic_guide?: string;
  notes?: string;
  attributes?: any;
  // Local form state (not sent to TL)
  frontImageFile?: File;
  frontAudioFile?: File;
  backImageFile?: File;
  backAudioFile?: File;
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

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "ja", label: "Japanese" },
  { value: "vi", label: "Vietnamese" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const createEmptyCard = (): Flashcard => ({
  id: Math.random().toString(36).substr(2, 9),
  front_text: "",
  back_text: "",
});

const createEmptyFormData = (): SubmitDeckFormData => ({
  name: "",
  description: "",
  frontLanguage: "en",
  backLanguage: "zh",
  inputMode: "manual",
  flashcards: Array(5).fill(null).map(() => createEmptyCard()),
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

  const handleFileChange = (cardId: string, field: 'frontImageFile' | 'frontAudioFile' | 'backImageFile' | 'backAudioFile', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      flashcards: prev.flashcards.map(card =>
        card.id === cardId ? { ...card, [field]: file || undefined } : card
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

  const FileDropZone = ({ onFileChange, accept, label }: {
    onFileChange: (file: File | null) => void;
    accept: string;
    label: string;
  }) => (
    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors">
      <input
        type="file"
        accept={accept}
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden"
        id={`file-${Math.random()}`}
      />
      <label htmlFor={`file-${Math.random()}`} className="cursor-pointer text-sm text-muted-foreground">
        {label}
      </label>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Deck</h1>
        <p className="text-muted-foreground">
          Create flashcard deck for testnet review
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

          <div className="grid grid-cols-2 gap-4">
            <Select
              value={formData.frontLanguage}
              onValueChange={(value) => handleInputChange("frontLanguage", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Front language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.backLanguage}
              onValueChange={(value) => handleInputChange("backLanguage", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Back language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={formData.inputMode === 'manual' ? 'default' : 'outline'}
            onClick={() => handleInputChange('inputMode', 'manual')}
            disabled={isSubmitting}
          >
            Manual Entry
          </Button>
          <Button
            type="button"
            variant={formData.inputMode === 'csv' ? 'default' : 'outline'}
            onClick={() => handleInputChange('inputMode', 'csv')}
            disabled={isSubmitting}
          >
            CSV Import
          </Button>
        </div>

        {/* Content Area */}
        {formData.inputMode === 'csv' ? (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Flashcards</h3>
              <Button type="button" onClick={addCard} disabled={isSubmitting} size="sm">
                + Add Card
              </Button>
            </div>
            
            {formData.flashcards.map((card, index) => (
              <div key={card.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Card {index + 1}</span>
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
                     <div className="grid grid-cols-2 gap-2">
                       <FileDropZone
                         onFileChange={(file) => handleFileChange(card.id, 'frontImageFile', file)}
                         accept="image/*"
                         label="📸 Image"
                       />
                       <FileDropZone
                         onFileChange={(file) => handleFileChange(card.id, 'frontAudioFile', file)}
                         accept="audio/*"
                         label="🎵 Audio"
                       />
                     </div>
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
                     <div className="grid grid-cols-2 gap-2">
                       <FileDropZone
                         onFileChange={(file) => handleFileChange(card.id, 'backImageFile', file)}
                         accept="image/*"
                         label="📸 Image"
                       />
                       <FileDropZone
                         onFileChange={(file) => handleFileChange(card.id, 'backAudioFile', file)}
                         accept="audio/*"
                         label="🎵 Audio"
                       />
                     </div>
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
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Uploading..." : "Submit to Testnet"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => {
              setFormData(createEmptyFormData());
              setErrors({});
            }}
          >
            Reset
          </Button>
        </div>
      </form>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Free testnet submission • Media files uploaded to Irys • Quality decks promoted to mainnet
        </p>
      </div>
    </div>
  );
};

export default SubmitDeckPage; 