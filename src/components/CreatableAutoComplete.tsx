import {
  ActionMeta,
  components,
  OnChangeValue,
  OptionProps,
  StylesConfig,
} from "react-select";
import CreatableSelect from "react-select/creatable";
import { FC, KeyboardEventHandler, useCallback, useState } from "react";
import { Button } from "./Buttons/Button";

export interface AutoCompleteOption {
  readonly value: string;
  readonly label: string;
  readonly isFixed?: boolean; // NOTE: isFixedは消す
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
  onCreateItem: (arg: { value: string; label: string }) => Promise<void>;
};
export const CreatableAutoComplete: FC<Props> = ({
  options,
  onChange: onChange_,
  placeholder,
  defaultValueIds = [],
  onCreateItem,
}) => {
  const [inputLabel, setInputLabel] = useState("");

  const defaultValues = options.filter((v) =>
    defaultValueIds.includes(v.value)
  );
  const [value, setValue] = useState<readonly AutoCompleteOption[]>(
    orderOptions(defaultValues)
  );

  const onCreateOption = useCallback(async () => {
    const option = {
      value: crypto.randomUUID(),
      label: inputLabel,
      isFixed: false,
    };
    setValue((prev) => [...prev, option]);
    await onCreateItem(option);
    setTimeout(() => setInputLabel(""), 10);
    return option;
  }, [inputLabel, onCreateItem]);

  const handleKeyDown: KeyboardEventHandler = async (event) => {
    if (!inputLabel) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        await onCreateOption();
    }
  };

  const onChange = async (
    newValue: OnChangeValue<AutoCompleteOption, true>,
    actionMeta: ActionMeta<AutoCompleteOption>
  ) => {
    switch (actionMeta.action) {
      case "select-option":
      case "deselect-option": {
        setValue(orderOptions(newValue));
        onChange_?.(newValue, actionMeta);
      }
      case "create-option": {
        if (inputLabel) {
          const option = await onCreateOption();
          onChange_?.(
            newValue.map((v) => {
              if (v.label === option.label) return option;
              return v;
            }),
            actionMeta
          );
        }
        break;
      }
      case "remove-value":
      case "pop-value":
      case "clear":
        newValue = options.filter((v) => v.isFixed);
        setValue(orderOptions(newValue));
        onChange_?.(newValue, actionMeta);
        break;
      default: {
        const _exhaustiveCheck: never = actionMeta;
        break;
      }
    }
  };

  return (
    <CreatableSelect
      value={value}
      inputValue={inputLabel}
      onInputChange={(newValue) => setInputLabel(newValue)}
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
