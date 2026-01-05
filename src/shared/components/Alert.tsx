type Props = {
  tone: "info" | "error" | "success";
  title?: string;
  message: string;
};

export function Alert({ tone, title, message }: Props) {
  const className = tone === "error" ? "error-bar" : tone === "success" ? "success-bar" : "notice-bar";
  return (
    <div className={className} role={tone === "error" ? "alert" : "status"}>
      {title && <strong style={{ display: "block", marginBottom: 4 }}>{title}</strong>}
      <span>{message}</span>
    </div>
  );
}
