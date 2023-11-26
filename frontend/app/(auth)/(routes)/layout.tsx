export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center w-full h-full mt-12">
      {children}
    </div>
  )
}