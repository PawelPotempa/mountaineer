'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const formSchema = {
    peak: z.object({
        name: z.string().min(1, "Name is required"),
        elevation: z.number().min(0, "Elevation must be positive"),
        description: z.string().optional(),
    }),
    pass: z.object({
        name: z.string().min(1, "Name is required"),
        elevation: z.number().min(0, "Elevation must be positive"),
        description: z.string().optional(),
    }),
    river: z.object({
        name: z.string().min(1, "Name is required"),
        length: z.number().optional(),
        description: z.string().optional(),
    }),
    lake: z.object({
        name: z.string().min(1, "Name is required"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
    shelter: z.object({
        name: z.string().min(1, "Name is required"),
        capacity: z.number().min(1, "Capacity must be at least 1"),
        description: z.string().optional(),
    }),
    cave: z.object({
        name: z.string().min(1, "Name is required"),
        depth: z.number().optional(),
        description: z.string().optional(),
    }),
} as const;

type FormSchemaType = typeof formSchema;
type PinFormData<T extends PinType> = z.infer<FormSchemaType[T]>;

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
}

export function PinDialog({ pin, mode, open, onOpenChange, onSubmit, onDelete }: PinDialogProps) {
    const type = pin.type;
    const config = ICONS_CONFIG[type];

    const form = useForm<PinFormData<typeof type>>({
        resolver: zodResolver(formSchema[type]),
        defaultValues: {
            name: pin.details?.name || '',
            description: pin.details?.description || '',
            ...('elevation' in (pin.details || {}) ? { elevation: pin.details?.elevation } : {}),
            ...('capacity' in (pin.details || {}) ? { capacity: pin.details?.capacity } : {}),
            ...('depth' in (pin.details || {}) ? { depth: pin.details?.depth } : {}),
            ...('length' in (pin.details || {}) ? { length: pin.details?.length } : {}),
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
                        <config.icon className="h-5 w-5" style={{ color: config.color }} />
                        <span>{mode === 'create' ? 'New' : 'Edit'} {config.label}</span>
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
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
                                        <FormLabel>Elevation (m)</FormLabel>
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
                                        <FormLabel>Capacity (people)</FormLabel>
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
                                        <FormLabel>Depth (m)</FormLabel>
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
                                        <FormLabel>Length (km)</FormLabel>
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-2">
                            <Button type="submit" className="w-full">
                                {mode === 'create' ? 'Create' : 'Update'}
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
                                >
                                    Delete Pin
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 