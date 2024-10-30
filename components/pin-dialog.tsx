'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PinDetails, PinType } from "@/types/pins";
import { ICONS_CONFIG } from "@/components/map/icons-config";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { Loader2 } from "lucide-react";
import { pinFormSchema, type PinFormData } from "@/lib/validations/pins";

interface PinDialogProps {
    pin: {
        id?: string;
        x: number;
        y: number;
        type: PinType;
        details?: PinDetails[PinType];
    };
    mode: 'create' | 'edit';
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: PinDetails[PinType]) => void;
    onDelete?: () => void;
    isDeletePending?: boolean;
    isSubmitPending?: boolean;
}

function getDetailProperty<T extends PinType, K extends keyof PinDetails[T]>(
    details: PinDetails[PinType] | undefined,
    type: T,
    key: K
): PinDetails[T][K] | undefined {
    if (!details) return undefined;

    // Type guard to check if details matches the expected type
    const isMatchingType = (d: PinDetails[PinType]): d is PinDetails[T] => {
        switch (type) {
            case 'peak':
            case 'pass':
                return 'elevation' in d;
            case 'river':
                return 'length' in d;
            case 'lake':
            case 'cave':
                return 'depth' in d;
            case 'shelter':
                return 'capacity' in d;
            default:
                return false;
        }
    };

    return isMatchingType(details) ? details[key] : undefined;
}

export function PinDialog({ pin, mode, open, onOpenChange, onSubmit, onDelete, isDeletePending, isSubmitPending }: PinDialogProps) {
    const type = pin.type;
    const config = ICONS_CONFIG[type];

    const form = useForm<PinFormData<typeof type>>({
        resolver: zodResolver(pinFormSchema[type]),
        defaultValues: {
            name: pin.details?.name || '',
            description: pin.details?.description || '',
            ...(type === 'peak' || type === 'pass'
                ? { elevation: getDetailProperty(pin.details, type, 'elevation') }
                : {}),
            ...(type === 'shelter'
                ? { capacity: getDetailProperty(pin.details, type, 'capacity') }
                : {}),
            ...(type === 'cave' || type === 'lake'
                ? { depth: getDetailProperty(pin.details, type, 'depth') }
                : {}),
            ...(type === 'river'
                ? { length: getDetailProperty(pin.details, type, 'length') }
                : {}),
        },
    });

    const handleSubmit = async (data: PinFormData<typeof type>) => {
        onSubmit(data);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            form.reset();
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="z-[1001]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <config.icon size={20} style={{ color: config.color }} />
                        <span>{mode === 'create' ? 'Nowy' : 'Edytuj'} punkt</span>
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nazwa</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {(type === 'peak' || type === 'pass') && (
                            <FormField
                                control={form.control}
                                name="elevation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Wysokość (m)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={e => {
                                                    const value = e.target.value ? parseFloat(e.target.value) : null;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {type === 'shelter' && (
                            <FormField
                                control={form.control}
                                name="capacity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Pojemność (osób)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={e => {
                                                    const value = e.target.value ? parseFloat(e.target.value) : null;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {(type === 'cave' || type === 'lake') && (
                            <FormField
                                control={form.control}
                                name="depth"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Głębokość (m)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={e => {
                                                    const value = e.target.value ? parseFloat(e.target.value) : null;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {type === 'river' && (
                            <FormField
                                control={form.control}
                                name="length"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Długość (km)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value || ''}
                                                onChange={e => {
                                                    const value = e.target.value ? parseFloat(e.target.value) : null;
                                                    field.onChange(value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Opis</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2">
                            <Button type="submit" className="w-full" disabled={isSubmitPending}>
                                {isSubmitPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    mode === 'create' ? 'Utwórz' : 'Aktualizuj'
                                )}
                            </Button>

                            {mode === 'edit' && onDelete && (
                                <Button
                                    type="button"
                                    variant="destructive"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete();
                                    }}
                                    disabled={isDeletePending}
                                >
                                    {isDeletePending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Usuń punkt'
                                    )}
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 