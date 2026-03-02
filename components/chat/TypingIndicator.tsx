export function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 justify-start">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
        <span className="text-sm">🤖</span>
      </div>
      <div className="rounded-2xl rounded-bl-none bg-muted px-4 py-3">
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </div>
  );
}
