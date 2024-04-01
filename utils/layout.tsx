import { ReactNode, useState, useEffect, useContext } from "react";
import { Error as ErrorComponent } from "../src/components/index"; // Renamed Error to ErrorComponent
import { ChatAppContext } from "../context/ChatAppContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalError, setModalError] = useState("");
  const context = useContext(ChatAppContext);

  if (!context) {
    throw new Error("Friend must be used within a ChatAppContextProvider");
  }

  const { error, setError } = context;

  useEffect(() => {
    if (error !== "") {
      document.body.style.overflow = "hidden";
      setModalError(error);
      setModalOpen(true);
      setError("");
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [error, setError]);

  return (
    <>
      {modalOpen && (
        <ErrorComponent
          error={modalError}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      {children}
    </>
  );
};

export default Layout;