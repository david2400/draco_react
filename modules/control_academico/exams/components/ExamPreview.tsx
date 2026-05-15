/**
 * ExamPreview - Vista previa completa del examen
 */

'use client';

import { memo, useState, useMemo } from 'react';
import type { Question } from '../../questions/types';
import { ExamQuestionPreview } from './ExamQuestionPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card/scenes/card';
import { Badge } from '@repo/ui/badges/scenes/badge';
import { Buttons } from '@repo/ui/buttons/scenes';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

interface ExamPreviewProps {
  title: string;
  instructions?: string;
  questions: Question[];
  duration?: number;
  showAnswers?: boolean;
  mode?: 'list' | 'paginated';
}

function ExamPreviewBase({
  title,
  instructions,
  questions,
  duration,
  showAnswers = false,
  mode = 'list',
}: ExamPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalPoints = useMemo(
    () => questions.reduce((acc, q) => acc + q.maxScore, 0),
    [questions]
  );

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {instructions && (
              <p className="text-sm text-muted-foreground">{instructions}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <Badge variant="outline">{questions.length} preguntas</Badge>
            <Badge variant="counter">{totalPoints} pts</Badge>
            {duration && <Badge variant="secondary">{duration} min</Badge>}
          </div>
        </div>

        {/* Progress bar for paginated mode */}
        {mode === 'paginated' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Pregunta {currentIndex + 1} de {questions.length}
              </span>
              <span>
                {Math.round(((currentIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {mode === 'list' ? (
          /* List Mode - Todas las preguntas */
          <div className="space-y-4">
            {questions.map((question, index) => (
              <ExamQuestionPreview
                key={question.id}
                question={question}
                index={index}
                showAnswer={showAnswers}
              />
            ))}
          </div>
        ) : (
          /* Paginated Mode - Una pregunta a la vez */
          <>
            {currentQuestion && (
              <ExamQuestionPreview
                question={currentQuestion}
                index={currentIndex}
                showAnswer={showAnswers}
              />
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Buttons
                type="button"
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2"
              >
                <HiOutlineChevronLeft className="h-4 w-4" />
                Anterior
              </Buttons>

              {/* Question dots */}
              <div className="flex gap-1 flex-wrap justify-center max-w-[200px]">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === currentIndex
                        ? 'bg-primary'
                        : 'bg-muted hover:bg-muted-foreground/30'
                    }`}
                    aria-label={`Ir a pregunta ${idx + 1}`}
                  />
                ))}
              </div>

              <Buttons
                type="button"
                variant="outline"
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="inline-flex items-center gap-2"
              >
                Siguiente
                <HiOutlineChevronRight className="h-4 w-4" />
              </Buttons>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export const ExamPreview = memo(ExamPreviewBase);
export default ExamPreview;
