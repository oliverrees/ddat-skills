interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-7xl mx-auto mt-6 px-4 mb-4">{children}</div>;
};
