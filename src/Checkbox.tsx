import { useState, useEffect, memo } from "react";
import MuiCheckbox from "@material-ui/core/Checkbox";
import type { CheckboxProps as MuiCheckboxProps } from "@material-ui/core/Checkbox";
import { useConstCallback } from "powerhooks/useConstCallback";

export type CheckboxProps = MuiCheckboxProps;

export const Checkbox = memo((props: CheckboxProps) => {
    const defaultChecked =
        props.checked === undefined ? false : props.defaultChecked ?? false;

    const [isChecked, setIsChecked] = useState(defaultChecked);

    useEffect(() => setIsChecked(defaultChecked), [defaultChecked]);

    const onChange = useConstCallback<CheckboxProps["onChange"]>(
        (event, checked) => {
            setIsChecked(checked);

            props.onChange?.(event, checked);
        },
    );

    return (
        <MuiCheckbox
            {...props}
            {...(props.checked !== undefined
                ? {
                      "value": props.checked ? "on" : "off",
                  }
                : {
                      "checked": isChecked,
                      onChange,
                      "value": isChecked ? "on" : "off",
                  })}
        />
    );
});
