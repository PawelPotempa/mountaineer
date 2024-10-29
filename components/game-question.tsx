'use client';

import { Pin, PinDetails, PinType } from "@/types/pins";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { ICONS_CONFIG } from "./map/icons-config";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type QuestionType<T extends PinType = PinType> = {
    question: string | ((pin: Pin & { type: T; details: PinDetails[T] }) => string);
    answer: (pin: Pin & { type: T; details: PinDetails[T] }) => string | number;
    format: (pin: Pin & { type: T; details: PinDetails[T] }) => string;
};

type PinQuestionConfig<T extends PinType> = QuestionType<T>;

const QUESTIONS: { [T in PinType]: PinQuestionConfig<T>[] } = {
    peak: [
        {
            question: "Jak nazywa się ten szczyt?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest wysokość ${pin.details.name}?`,
            answer: (pin) => pin.details.elevation,
            format: (pin) => `Wysokość wynosi ${pin.details.elevation}m`,
        }
    ],
    pass: [
        {
            question: "Jak nazywa się ta przełęcz?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest wysokość ${pin.details.name}?`,
            answer: (pin) => pin.details.elevation,
            format: (pin) => `Wysokość wynosi ${pin.details.elevation}m`,
        }
    ],
    river: [
        {
            question: "Jak nazywa się ta rzeka?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest długość ${pin.details.name}?`,
            answer: (pin) => pin.details.length ?? 0,
            format: (pin) => `Długość wynosi ${pin.details.length}km`,
        }
    ],
    lake: [
        {
            question: "Jak nazywa się ten staw?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest głębokość ${pin.details.name}?`,
            answer: (pin) => pin.details.depth ?? 0,
            format: (pin) => `Głębokość wynosi ${pin.details.depth}m`,
        }
    ],
    shelter: [
        {
            question: "Jak nazywa się ten schron?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest pojemność ${pin.details.name}?`,
            answer: (pin) => pin.details.capacity,
            format: (pin) => `Pojemność wynosi ${pin.details.capacity} osób`,
        }
    ],
    cave: [
        {
            question: "Jak nazywa się ta jaskinia?",
            answer: (pin) => pin.details.name,
            format: (pin) => `To ${pin.details.name}`,
        },
        {
            question: (pin) => `Jaka jest głębokość ${pin.details.name}?`,
            answer: (pin) => pin.details.depth ?? 0,
            format: (pin) => `Głębokość wynosi ${pin.details.depth}m`,
        }
    ]
} as const;

interface GameQuestionProps {
    pin: Pin | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onNextPin: () => void;
}

export function GameQuestion({ pin, open, onOpenChange, onNextPin }: GameQuestionProps) {
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null);

    // Reset state when pin changes
    useEffect(() => {
        if (pin) {
            const questions = QUESTIONS[pin.type] || [];
            const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
            setCurrentQuestion(randomQuestion as QuestionType);
            setAnswer("");
            setIsCorrect(null);
        }
    }, [pin]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && isCorrect !== null) {
                handleNext();
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [isCorrect]);

    if (!pin || !currentQuestion) return null;

    const config = ICONS_CONFIG[pin.type];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correctAnswer = currentQuestion.answer(pin);
        const isAnswerCorrect =
            typeof correctAnswer === 'number'
                ? Number(answer) === correctAnswer
                : answer.toLowerCase() === correctAnswer.toLowerCase();

        setIsCorrect(isAnswerCorrect);
    };

    const handleNext = () => {
        setAnswer("");
        setIsCorrect(null);
        onNextPin();
    };

    return (
        <Dialog open={open} onOpenChange={() => { }} modal={false}>
            <DialogContent
                className="z-[1001] fixed bottom-4 left-1/2 -translate-x-1/2 top-auto translate-y-0 max-w-[90vw] w-[500px]"
                onPointerDownOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                hideCloseButton
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <config.icon className="h-5 w-5" style={{ color: config.color }} />
                        <span>Pytanie {isCorrect !== null && `- ${isCorrect ? "Dobrze!" : "Źle"}`}</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <p className="text-lg font-medium">
                        {typeof currentQuestion.question === 'function'
                            ? currentQuestion.question(pin)
                            : currentQuestion.question}
                    </p>

                    {isCorrect === null ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Wpisz swoją odpowiedź..."
                                className="text-center"
                                autoFocus
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                variant={answer.trim() ? "default" : "secondary"}
                            >
                                {answer.trim() ? "Sprawdź odpowiedź" : "Pokaż odpowiedź"}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className={cn(
                                "p-4 rounded-lg",
                                isCorrect ? "bg-green-100" : "bg-red-50"
                            )}>
                                <div className="flex items-center gap-2 mb-2">
                                    {isCorrect ? (
                                        <>
                                            <Check className="h-5 w-5 text-green-600" />
                                            <span className="text-green-600 font-medium">Świetnie!</span>
                                        </>
                                    ) : (
                                        <>
                                            <X className="h-5 w-5 text-red-600" />
                                            <span className="text-red-600 font-medium">
                                                {answer.trim() ? "Nie do końca" : "Nie szkodzi, nauczmy się!"}
                                            </span>
                                        </>
                                    )}
                                </div>
                                {!isCorrect && (
                                    <div className="mt-2 p-3 bg-white rounded border border-gray-200">
                                        <p className="text-gray-900 font-medium">
                                            {currentQuestion.format(pin)}
                                        </p>
                                        {answer.trim() && (
                                            <p className="text-gray-500 mt-1 text-sm">
                                                Twoja odpowiedź: {answer}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full"
                                autoFocus
                            >
                                Następny punkt
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 