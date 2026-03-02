import { ChatMessage as ChatMessageType } from "@/lib/types";
import { cn, getRelativeTime } from "@/lib/utils";

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("# ")) return <h1 key={i} className="font-bold text-base">{line.slice(2)}</h1>;
        if (line.startsWith("## ")) return <h2 key={i} className="font-semibold">{line.slice(3)}</h2>;
        if (line.startsWith("- ")) return <div key={i} className="flex gap-1.5"><span>•</span><span>{formatInline(line.slice(2))}</span></div>;
        if (line === "") return <div key={i} className="h-1" />;
        return <p key={i}>{formatInline(line)}</p>;
      })}
    </div>
  );
}

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-end gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
          <span className="text-sm">🤖</span>
        </div>
      )}
      <div className="max-w-[75%] space-y-1">
        <div className={cn(
          "rounded-2xl px-4 py-2.5",
          isUser ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none"
        )}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <SimpleMarkdown content={message.content} />
          )}
        </div>
        <p className={cn("text-xs text-muted-foreground/70", isUser && "text-right")}>
          {getRelativeTime(message.timestamp)}
        </p>
      </div>
      {isUser && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shrink-0">
          <span className="text-sm text-white">👤</span>
        </div>
      )}
    </div>
  );
}
