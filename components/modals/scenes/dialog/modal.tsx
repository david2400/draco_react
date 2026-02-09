/** @format */

"use client";

import React from "react";

import { IDialog } from "@/components/modals/models/dialog.interfaces";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/modals/scenes/dialog/dialog";
import { cn } from "@/lib/utils";
import { Buttons } from "@repo/ui/buttons/scenes";

const dialogSizeVariants: Record<NonNullable<IDialog["size"]>, string> = {
  sm: "[--dialog-max-width:28rem]",
  md: "[--dialog-max-width:32rem]",
  lg: "[--dialog-max-width:42rem]",
  xl: "[--dialog-max-width:56rem]",
  full: "max-w-none [--dialog-max-width:95vw] [--dialog-max-height:calc(100vh-2rem)] sm:[--dialog-max-width:85vw] sm:[--dialog-max-height:90vh]",
};

export function Modal({
  title,
  description,
  footer,
  children,
  size = "md",
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  showCloseButton = true,
  hideDefaultFooter,
  cancelText = "Cancelar",
  // trigger,
  ...dialogProps
}: IDialog) {
  const sizeClassName = dialogSizeVariants[size];

  return (
    <Dialog {...dialogProps}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(
          "max-h-[85vh] gap-0 overflow-hidden p-0 bg-white",
          sizeClassName,
          contentClassName,
        )}>
        {title || description ? (
          <DialogHeader
            className={cn("shrink-0 px-6 pt-6 pb-4", headerClassName)}>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>
        ) : null}

        <div
          className={cn("min-h-0 flex-1 overflow-y-auto px-6", bodyClassName)}>
          {children}
        </div>

        {footer ? (
          <DialogFooter className={cn("shrink-0", footerClassName)}>
            {footer}
          </DialogFooter>
        ) : hideDefaultFooter ? null : (
          <DialogFooter className={cn("shrink-0 justify-end", footerClassName)}>
            <DialogClose asChild>
              <Buttons variant='outline' type='button'>
                {cancelText ?? "Cancelar"}
              </Buttons>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
