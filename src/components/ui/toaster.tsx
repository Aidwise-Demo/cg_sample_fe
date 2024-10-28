"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection="up">
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        success,
        ...props
      }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              "top-0 w-[555px] relative",
              success && "bg-successGreen200"
            )}
          >
            <div
              className={cn(
                "grid gap-1 clear-start font-medium",
                success && "text-darkBlack600"
              )}
            >
              {title && (
                <ToastTitle className="text-lg flex items-center">
                  {success && (
                    <Image
                      alt="like"
                      src={"/assets/like.svg"}
                      width={17}
                      className="mr-2"
                      height={17}
                    />
                  )}
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-base ml-6">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />

            {success && (
              <div className="bg-[#4EAF51] absolute bottom-0 h-[6px] w-full right-0 rounded-bl-md  rounded-br-md"></div>
            )}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
