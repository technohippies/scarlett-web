"use client"

import * as React from "react"
import { useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { 
  SpeakerHigh, 
  Play, 
  Pause, 
  Spinner,
  Question
} from "@phosphor-icons/react"
import { IconButton } from "@/components/ui/icon-button"
import { Button } from "@/components/ui/button"
import { IntroSheet } from "@/components/ui/intro-sheet"

// Custom spin animation style
const spinAnimation = `
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  .ai-message-spinner {
    animation: spin 1s linear infinite;
  }
`;

const messageVariants = cva(
  "text-base text-neutral-100 leading-relaxed",
  {
    variants: {
      variant: {
        default: "",
        highlighted: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AIMessageProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof messageVariants> {
  text: string
  highlights?: {
    text: string
    explanation: string
  }[]
  introSheet?: {
    titleEn: string
    titleZh: string
    contentItems: {
      icon: 'info' | 'note'
      text: string
    }[]
    onPlayAudio?: () => void
  }
  onPlayAudio?: () => Promise<void>
  onSpeedChange?: (speed: 1 | 0.7 | 0.5) => void
  onHelp?: () => void
  surveyButtons?: {
    text: string
    onClick: () => void
  }[]
}

export function AIMessage({
  className,
  variant,
  text,
  highlights = [],
  introSheet,
  onPlayAudio,
  onSpeedChange,
  onHelp,
  surveyButtons = [],
  ...props
}: AIMessageProps) {
  const [audioStatus, setAudioStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'ready'>('idle')
  const [speed, setSpeed] = useState<1 | 0.7 | 0.5>(1)

  // Handle audio playback
  const handleAudioPlay = async () => {
    if (!onPlayAudio) return;
    
    if (audioStatus === 'idle' || audioStatus === 'ready') {
      if (audioStatus === 'idle') {
        setAudioStatus('loading');
        try {
          await onPlayAudio();
          setAudioStatus('playing');
          // In a real implementation, you'd start the audio here
          
          // Simulate audio ending after 3 seconds
          setTimeout(() => {
            setAudioStatus('ready');
          }, 3000);
        } catch (error) {
          setAudioStatus('idle');
          console.error('Failed to play audio:', error);
        }
      } else {
        setAudioStatus('playing');
        // Resume audio
      }
    } else if (audioStatus === 'playing') {
      setAudioStatus('paused');
      // Pause audio
    } else if (audioStatus === 'paused') {
      setAudioStatus('playing');
      // Resume audio
    }
  };

  // Handle speed change
  const handleSpeedChange = () => {
    const newSpeed = speed === 1 ? 0.7 : speed === 0.7 ? 0.5 : 1;
    setSpeed(newSpeed);
    if (onSpeedChange) {
      onSpeedChange(newSpeed);
    }
  };

  // Render the text with highlighted sections
  const renderTextWithHighlights = () => {
    if (!highlights || highlights.length === 0) {
      return <p>{text}</p>;
    }

    // Create an array of segments
    const segments: React.ReactNode[] = [];
    let lastIndex = 0;

    // Sort highlights by their position in the text
    const sortedHighlights = [...highlights].sort((a, b) => 
      text.indexOf(a.text) - text.indexOf(b.text)
    );

    sortedHighlights.forEach((highlight, i) => {
      const highlightText = highlight.text;
      const index = text.indexOf(highlightText, lastIndex);
      
      if (index !== -1) {
        // Add text before the highlight
        if (index > lastIndex) {
          segments.push(
            <span key={`text-${i}`}>{text.substring(lastIndex, index)}</span>
          );
        }
        
        // Format the title - capitalize first letter
        const formattedTitle = highlightText.charAt(0).toUpperCase() + highlightText.slice(1);
        
        // Add the highlighted text with complete IntroSheet
        segments.push(
          <IntroSheet
            key={`highlight-${i}`}
            trigger={
              <span 
                className="text-yellow-300 font-medium cursor-pointer hover:underline"
              >
                {highlightText}
              </span>
            }
            titleEn={formattedTitle}
            titleZh="英语语法点"
            contentItems={[
              {
                icon: 'info',
                text: highlight.explanation
              },
              {
                icon: 'note',
                text: "Try using this in your own sentences for practice."
              }
            ]}
            onPlayAudio={() => {
              if (onPlayAudio) {
                handleAudioPlay();
              }
            }}
          />
        );
        
        lastIndex = index + highlightText.length;
      }
    });
    
    // Add any remaining text
    if (lastIndex < text.length) {
      segments.push(
        <span key="text-end">{text.substring(lastIndex)}</span>
      );
    }
    
    return <p>{segments}</p>;
  };

  // Render the appropriate audio icon based on status
  const renderAudioIcon = () => {
    if (audioStatus === 'loading') {
      return (
        <>
          <style>{spinAnimation}</style>
          <div className="ai-message-spinner">
            <Spinner size={20} />
          </div>
        </>
      );
    } else if (audioStatus === 'playing') {
      return <Pause size={20} />;
    } else if (audioStatus === 'ready') {
      return <Play size={20} />;
    } else {
      return <SpeakerHigh size={20} />;
    }
  };

  // Render survey buttons if provided
  const renderSurveyButtons = () => {
    if (!surveyButtons || surveyButtons.length === 0) {
      return null;
    }

    return (
      <div className="flex flex-col space-y-2 mt-4 w-full max-w-xs">
        {surveyButtons.map((button, index) => (
          <Button
            key={`survey-button-${index}`}
            variant="outline"
            onClick={button.onClick}
            className="justify-start text-left"
          >
            {button.text}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex flex-col space-y-2 rounded-md", className)} {...props}>
      {/* Message text */}
      <div className={cn(messageVariants({ variant, className }), "rounded-md")}>
        {renderTextWithHighlights()}
      </div>
      
      {/* Survey buttons */}
      {renderSurveyButtons()}
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4 mt-2">
        {introSheet ? (
          <IntroSheet 
            trigger={<IconButton icon={<Question size={20} />} />}
            titleEn={introSheet.titleEn}
            titleZh={introSheet.titleZh}
            contentItems={introSheet.contentItems}
            onPlayAudio={introSheet.onPlayAudio}
          />
        ) : (
          <IconButton
            icon={<Question size={20} />}
            onClick={onHelp}
          />
        )}
        
        <IconButton
          icon={<span className="text-sm font-medium">{speed === 1 ? "1x" : speed === 0.7 ? ".7x" : ".5x"}</span>}
          onClick={handleSpeedChange}
        />
        
        <IconButton
          icon={renderAudioIcon()}
          onClick={handleAudioPlay}
          disabled={audioStatus === 'loading'}
        />
      </div>
    </div>
  )
}

export { messageVariants } 