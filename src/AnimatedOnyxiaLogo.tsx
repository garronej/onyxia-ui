import { memo } from "react";
import { tss, keyframes } from "tss-react";
import type { Theme } from "./lib/ThemeProvider";

export type Props = {
    theme: Theme;
};

export const AnimatedOnyxiaLogo = memo((props: Props) => {
    const { theme } = props;

    const { classes } = useStyles({ theme });

    return (
        <svg
            className={classes.root}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 445 293"
        >
            <g>
                <path d="M106.253 215.9L140.204 250.02C151.012 260.883 168.528 260.883 179.322 250.02L213.273 215.9L159.763 162.123L106.253 215.9Z" />
                <path d="M232.743 215.9L266.693 250.02C277.502 260.883 295.018 260.883 305.812 250.02L339.762 215.9L286.253 162.123L232.743 215.9Z" />
            </g>
            <g>
                <path d="M43 152.331L76.9508 186.452C87.7594 197.314 105.275 197.314 116.069 186.452L150.02 152.331L96.5099 98.5537L43 152.331Z" />
                <path d="M169.49 152.331L203.441 186.452C214.25 197.314 231.765 197.314 242.559 186.452L276.51 152.331L223 98.5537L169.49 152.331Z" />
                <path d="M349.49 98.5537L295.98 152.331L329.931 186.452C340.74 197.314 358.256 197.314 369.049 186.452L403 152.331L349.49 98.5537Z" />
            </g>
            <g>
                <path d="M232.743 88.7774L266.693 122.898C277.502 133.761 295.018 133.761 305.812 122.898L339.762 88.7774L286.253 35L232.743 88.7774Z" />
                <path d="M106.253 88.7774L140.204 122.898C151.012 133.761 168.528 133.761 179.322 122.898L213.273 88.7774L159.763 35L106.253 88.7774Z" />
            </g>
        </svg>
    );
});

const useStyles = tss
    .withParams<{ theme: Theme }>()
    .withName({ AnimatedOnyxiaLogo })
    .create(({ theme }) => ({
        "root": {
            "height": "20%",
            "fill": theme.colors.useCases.typography.textFocus,
            "& g": {
                "opacity": 0,
                "animation": `${keyframes`
                            60%, 100% {
                                opacity: 0;
                            }
                            0% {
                                opacity: 0;
                            }
                            40% {
                                opacity: 1;
                            }
                            `} 3.5s infinite ease-in-out`,
                "&:nth-of-type(1)": {
                    "animationDelay": ".4s",
                },
                "&:nth-of-type(2)": {
                    "animationDelay": ".8s",
                },
                "&:nth-of-type(3)": {
                    "animationDelay": "1.2s",
                },
            },
        },
    }));
