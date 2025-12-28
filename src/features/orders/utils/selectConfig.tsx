import { components } from "react-select";
import type { StylesConfig, ThemeConfig, OptionProps } from "react-select";
import type { OptionType } from "./orderOptions";

// Custom Option component to show checkmark when selected
export const CustomOption = (props: OptionProps<OptionType, boolean>) => (
    <components.Option {...props}>
        <div className="flex items-center justify-between">
            <span>{props.label}</span>
            {props.isSelected && (
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5 10.5L9 14.5L15 7.5"
                        stroke="#0062ff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
    </components.Option>
);

// Select theme configuration
export const selectTheme: ThemeConfig = (theme) => ({
    ...theme,
    borderRadius: 8,
    colors: {
        ...theme.colors,
        primary25: "#f0f0f0",
        primary: "#0062ff",
    },
    spacing: {
        ...theme.spacing,
    },
});

// Select styles configuration
export const selectStyles: StylesConfig<OptionType, boolean> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: "#fff",
        borderColor: "#d1d5db",
        minHeight: "36px",
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 4,
        paddingLeft: 4,
        fontWeight: "bold",
        direction: "rtl",
        boxShadow: state.isFocused ? "0 0 0 2px #0062ff22" : undefined,
        cursor: "pointer",
    }),
    menu: (base) => ({
        ...base,
        direction: "rtl",
        zIndex: 9999,
    }),
    option: (base, state) => ({
        ...base,
        color: "#1f2937",
        backgroundColor: state.isSelected || state.isFocused ? "#f0f0f0" : "#fff",
        cursor: "pointer",
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 8,
        paddingLeft: 8,
        fontWeight: state.isSelected ? "bold" : "normal",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    }),
    input: (base) => ({
        ...base,
        color: "#1f2937",
        padding: 0,
        direction: "rtl",
    }),
    multiValue: (base) => ({
        ...base,
        direction: "rtl",
        backgroundColor: "#e0e7ff",
        color: "#1f2937",
        fontWeight: "bold",
    }),
    multiValueLabel: (base) => ({
        ...base,
        direction: "rtl",
        color: "#1f2937",
        fontWeight: "bold",
    }),
    multiValueRemove: (base) => ({
        ...base,
        cursor: "pointer",
    }),
};
