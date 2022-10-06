import styles from "./Navbar.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Modal from "../Modal";
import NavIcon from "../NavIcon";

const Navbar = () => {
  const { status } = useSession();
  const [modal, setModal] = useState(false);

  // Navigation icons configuration
  const navConfig = [
    {
      id: 1,
      tooltip: "Learn Mode",
      style: `${styles.nav__icon} ${styles.icon__learn}`,
      mode: "learn",
    },
    {
      id: 2,
      tooltip: "Practice Mode",
      style: `${styles.nav__icon} ${styles.icon__practice}`,
      mode: "practice",
    },
    {
      id: 3,
      tooltip: "Game Mode",
      style: `${styles.nav__icon} ${styles.icon__game}`,
      mode: "game",
    },
    {
      id: 4,
      tooltip: "Edit Mode",
      style: `${styles.nav__icon} ${styles.icon__edit} ${
        status !== "authenticated" && styles.protected
      }`,
      mode: "edit",
    },
  ];

  return (
    <>
      <aside className={styles.nav__container}>
        {navConfig.map((icon) => {
          return (
            <NavIcon
              key={icon.id}
              tooltip={icon.tooltip}
              style={icon.style}
              mode={icon.mode}
            />
          );
        })}
        <div
          className={styles.tooltip}
          data-text={status === "authenticated" ? "Sign Out" : "Sign In"}
        >
          <span
            onClick={() => {
              status === "authenticated"
                ? signOut()
                : setModal((prev) => !prev);
            }}
            className={`${styles.nav__icon} ${styles.icon__login}`}
          ></span>
        </div>
      </aside>
      {modal && <Modal setModal={setModal} />}
    </>
  );
};

export default Navbar;
