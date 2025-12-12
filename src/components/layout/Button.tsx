import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * ButtonProps:
 * - includes all native <button> props (without ref),
 * - merges cva variant props,
 * - adds asChild and loading convenience prop.
 */
type ButtonBaseProps = React.ComponentPropsWithoutRef<"button">;
type ButtonProps = ButtonBaseProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

/**
 * Forwarded ref type: HTMLButtonElement when rendered as a <button>,
 * otherwise HTMLElement for generic Slot children.
 */
const Button = React.forwardRef<HTMLButtonElement | HTMLElement, ButtonProps>(
  function Button(
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) {
    const Comp: React.ElementType = asChild ? Slot : "button";

    // If loading, ensure button is disabled for both semantics and behavior.
    const isDisabled = disabled || loading;

    // If using Slot we pass `aria-disabled` because the underlying element may not be a button.
    const extraProps =
      Comp === Slot
        ? {
            "aria-disabled": isDisabled,
            tabIndex: isDisabled ? -1 : props.tabIndex,
          }
        : { disabled: isDisabled };

    return (
      <Comp
        ref={ref as any}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...extraProps}
        {...(props as any)}
      >
        {/* Optional: if loading, you can show a spinner here before children */}
        {props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
