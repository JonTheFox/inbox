import styles from "../styles/TextInput.module.scss";

export default function TextInput({ onChange }) {
  function handleChange(ev) {
    if (!onChange) return;
    onChange(ev.target.value);
  }
  return (
    <input
      className={`${styles.input} glass`}
      onChange={(ev) => handleChange(ev)}
    />
  );
}
