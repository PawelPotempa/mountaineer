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
            question: "What's the name of this peak?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the elevation of ${pin.details.name}?`,
            answer: (pin) => pin.details.elevation,
            format: (pin) => `The elevation is ${pin.details.elevation}m`,
        }
    ],
    pass: [
        {
            question: "What's the name of this mountain pass?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the elevation of ${pin.details.name}?`,
            answer: (pin) => pin.details.elevation,
            format: (pin) => `The elevation is ${pin.details.elevation}m`,
        }
    ],
    river: [
        {
            question: "What's the name of this river?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the length of ${pin.details.name}?`,
            answer: (pin) => pin.details.length ?? 0,
            format: (pin) => `The length is ${pin.details.length}km`,
        }
    ],
    lake: [
        {
            question: "What's the name of this lake?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the depth of ${pin.details.name}?`,
            answer: (pin) => pin.details.depth ?? 0,
            format: (pin) => `The depth is ${pin.details.depth}m`,
        }
    ],
    shelter: [
        {
            question: "What's the name of this shelter?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the capacity of ${pin.details.name}?`,
            answer: (pin) => pin.details.capacity,
            format: (pin) => `The capacity is ${pin.details.capacity} people`,
        }
    ],
    cave: [
        {
            question: "What's the name of this cave?",
            answer: (pin) => pin.details.name,
            format: (pin) => `It's ${pin.details.name}`,
        },
        {
            question: (pin) => `What's the depth of ${pin.details.name}?`,
            answer: (pin) => pin.details.depth ?? 0,
            format: (pin) => `The depth is ${pin.details.depth}m`,
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
                        <span>Question</span>
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
                                placeholder="Your answer..."
                                autoFocus
                            />
                            <Button type="submit" className="w-full">
                                Check Answer
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className={cn(
                                "p-4 rounded-lg flex items-center gap-2",
                                isCorrect ? "bg-green-100" : "bg-red-100"
                            )}>
                                {isCorrect ? (
                                    <>
                                        <Check className="h-5 w-5 text-green-600" />
                                        <span className="text-green-600">Correct!</span>
                                    </>
                                ) : (
                                    <>
                                        <X className="h-5 w-5 text-red-600" />
                                        <span className="text-red-600">
                                            Incorrect. {currentQuestion.format(pin)}
                                        </span>
                                    </>
                                )}
                            </div>
                            <Button
                                onClick={handleNext}
                                className="w-full"
                                autoFocus
                            >
                                Next Pin
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
} 