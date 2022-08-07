import {
  ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useState,
} from "react";
import { ICellProps } from "./types";

import "./styles.scss";

const Cell: FC<ICellProps> = ({
  id, axis, value, changeCell,
}) => {
  const [innerValue, setInnerValue] = useState<number | string>(0);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    const currentValue = Number(e.currentTarget.value);
    if (currentValue >= -99 && currentValue <= 100) {
      setInnerValue(e.currentTarget.value);
    } else if (e.currentTarget.value === "-") {
      setInnerValue(e.currentTarget.value);
    }
  }, []);

  const onBlurHandler = useCallback<EventFunc<ChangeEvent>>(() => {
    if (innerValue !== value) {
      setInnerValue(value);
    }
  }, [value, innerValue]);

  const onKeyHandler = useCallback<EventFunc<KeyboardEvent>>((e) => {
    if (e.key === "Enter" && changeCell && Number(innerValue)) {
      changeCell(id, axis, Number(innerValue));
    } else if (e.key === "Enter" && changeCell && !Number(innerValue)) {
      changeCell(id, axis, 0);
    }
  }, [id, axis, innerValue, changeCell]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <td className="Cell">
      <input
        className="Cell__input"
        maxLength={5}
        type="text"
        value={innerValue}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onKeyDown={onKeyHandler}
        readOnly={!changeCell}
      />
    </td>
  );
};

export default Cell;
