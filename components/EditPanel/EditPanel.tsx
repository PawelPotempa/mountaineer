import styles from "./EditPanel.module.css";
import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { fetchedPins, formValues } from "@/atoms/pinsAtom";

const EditPanel = () => {
  const [form, setForm] = useRecoilState(formValues);
  const [pins, setPins] = useRecoilState(fetchedPins);

  // Handle form input change
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const value = e.target.value.toString();
    setForm({ ...form, [key]: value });
  };

  // Handle shape selector
  const shapeHandler = (e: MouseEvent<HTMLImageElement>) => {
    const shape = (e.target as HTMLImageElement).src
      .split("/")
      .slice(3)
      .join("/");
    setForm({
      ...form,
      shape,
    });
  };

  // Handle form submit
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/pins", {
      method: "POST",
      body: JSON.stringify({ ...form }),
    });

    if (!response.ok) {
      alert(
        `Error: ${response.status}
Please make sure the required fields are filled in!`
      );
    } else {
      //@ts-ignore
      setPins([...pins, { ...form }]);

      setForm({
        ...form,
        name: null,
        latitude: null,
        longitude: null,
        altitude: undefined,
        keystone_1: undefined,
        keystone_2: undefined,
        notes: undefined,
      });

      (e.target as HTMLFormElement).reset();

      return await response.json();
    }
  };

  return (
    <aside className={styles.form__container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.input__wrapper}>
          <label>Nazwa*:</label>
          <input
            className={styles.input}
            name="name"
            onChange={changeHandler}
          ></input>
        </div>
        <div className={styles.input__wrapper}>
          <label>
            {form.shape === "icons/lake/neutral.svg"
              ? "Głębokość:"
              : "Wysokość:"}
          </label>
          <input
            className={styles.input}
            name="altitude"
            onChange={changeHandler}
          ></input>
        </div>
        {form.shape === "icons/pass/neutral.svg" ? (
          <>
            <div className={styles.input__wrapper}>
              <label>Zwornik 1:</label>
              <input
                className={styles.input}
                name="keystone_1"
                onChange={changeHandler}
              ></input>
            </div>
            <div className={styles.input__wrapper}>
              <label>Zwornik 2:</label>
              <input
                className={styles.input}
                name="keystone_2"
                onChange={changeHandler}
              ></input>
            </div>
          </>
        ) : null}
        <div className={styles.input__wrapper}>
          <label>Opis:</label>
          <textarea
            className={styles.input}
            name="notes"
            onChange={changeHandler}
          ></textarea>
        </div>
        <button className={styles.form__button} type="submit">
          Send
        </button>
      </form>
      <div className={styles.shapes__container}>
        <img
          src="icons/mountain/neutral.svg"
          className={styles.shapes__icon}
          onClick={shapeHandler}
          alt="peak icon"
        ></img>
        <img
          src="icons/pass/neutral.svg"
          className={styles.shapes__icon}
          onClick={shapeHandler}
          alt="mountain pass icon"
        ></img>
        <img
          src="icons/lake/neutral.svg"
          className={styles.shapes__icon}
          onClick={shapeHandler}
          alt="mountain lake icon"
        ></img>
      </div>
    </aside>
  );
};

export default EditPanel;
