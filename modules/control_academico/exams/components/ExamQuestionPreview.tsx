/**
 * ExamQuestionPreview - Vista previa de pregunta en contexto de examen
 */

'use client';

import { memo, useState } from 'react';
import type { Question } from '../../questions/types';
import { QuestionRenderer } from '../../questions/renderers';
import { Badge } from '@repo/ui/badges/scenes/badge';
import { Buttons } from '@repo/ui/buttons/scenes';
import { getDifficultyConfig } from '../../questions/config';
import { cn } from '@/lib/utils';

interface ExamQuestionPreviewProps {
  question: Question;
  index: number;
  points?: number;
  showAnswer?: boolean;
  isActive?: boolean;
  onSelect?: () => void;
  className?: string;
}

function ExamQuestionPreviewBase({
  question,
  index,
  points,
  showAnswer = false,
  isActive = false,
  onSelect,
  className,
}: ExamQuestionPreviewProps) {
  const [userAnswer, setUserAnswer] = useState<unknown>(undefined);
  const difficultyConfig = getDifficultyConfig(question.difficulty);

  return (
    <div
      className={cn(
        'rounded-2xl border transition-colors',
        isActive ? 'border-primary/50 bg-primary/5' : 'border-border/60',
        onSelect && 'cursor-pointer hover:border-primary/30',
        className
      )}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border/40 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {index + 1}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {difficultyConfig && (
              <Badge className={difficultyConfig.color}>
                {difficultyConfig.label}
              </Badge>
            )}
          </div>
        </div>
        <Badge variant="counter" className="text-xs">
          {points ?? question.maxScore} pts
        </Badge>
      </div>

      {/* Question Content */}
      <div className="p-4">
        <QuestionRenderer
          question={question}
          value={userAnswer}
          onChange={setUserAnswer}
          showFeedback={showAnswer}
          showCorrectAnswer={showAnswer}
        />
      </div>
    </div>
  );
}

export const ExamQuestionPreview = memo(ExamQuestionPreviewBase);
export default ExamQuestionPreview;
