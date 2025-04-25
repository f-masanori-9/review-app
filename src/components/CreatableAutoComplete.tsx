import {
  ActionMeta,
  components,
  OnChangeValue,
  OptionProps,
  StylesConfig,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { FC, KeyboardEventHandler, useState } from "react";
import { Button } from "./Buttons/Button";

export interface AutoCompleteOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean;
  readonly createButton?: {
    onClick: () => void;
    label: string;
  };
}

const styles: StylesConfig<AutoCompleteOption, true> = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values: readonly AutoCompleteOption[]) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const Option = (props: OptionProps<AutoCompleteOption>) => {
  console.log("Option", props);
  if (props.data.createButton) {
    return (
      <Button
        onClick={props.data.createButton.onClick}
        title={props.data.createButton.label}
      ></Button>
    );
  }
  return <components.Option {...props} />;
};

type Props = {
  options: AutoCompleteOption[];
  onChange?: (
    value: readonly AutoCompleteOption[],
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => void;
  placeholder?: string;
  defaultValueIds?: string[];
  onCreateItem: (arg: { value: string; label: string }) => void;
};
export const CreatableAutoComplete: FC<Props> = ({
  options,
  onChange: onChange_,
  placeholder,
  defaultValueIds = [],
  onCreateItem,
}) => {
  const [inputValue, setInputValue] = useState("");

  const defaultValues = options.filter((v) =>
    defaultValueIds.includes(v.value)
  );
  const [value, setValue] = useState<readonly AutoCompleteOption[]>(
    orderOptions(defaultValues)
  );

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        const option = {
          value: crypto.randomUUID(),
          label: inputValue,
          isFixed: false,
        };
        setValue((prev) => [...prev, option]);
        onCreateItem(option);
        setTimeout(() => setInputValue(""), 10);
        event.preventDefault();
    }
  };

  const onChange = (
    newValue: OnChangeValue<AutoCompleteOption, true>,
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = options.filter((v) => v.isFixed);
        break;
    }

    setValue(orderOptions(newValue));
    onChange_?.(newValue, actionMeta);
  };

  return (
    <CreatableSelect
      value={value}
      inputValue={inputValue}
      onInputChange={(newValue) => setInputValue(newValue)}
      isMulti
      components={{ Option, DropdownIndicator: null }}
      styles={styles}
      isClearable={value.some((v) => !v.isFixed)}
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
    />
  );
};
