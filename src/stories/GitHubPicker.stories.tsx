import React from "react";
import { GitHubPicker } from "../GitHubPicker";
import { Button } from "../Button";
import { useStateRef } from "powerhooks/useStateRef";
import { useState } from "react";
import type { GitHubPickerProps } from "../GitHubPicker";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";
import { symToStr } from "tsafe/symToStr";
import { Evt } from "evt";
import type { UnpackEvt } from "evt";
import { useConst } from "powerhooks/useConst";
import { assert } from "tsafe/assert";
import { useConstCallback } from "powerhooks/useConstCallback";
import { useTranslation } from "./i18n";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { [symToStr({ GitHubPicker })]: Component },
});

export default meta;

function getTagColor(tag: string) {
    return getRandomColor(tag);
}

function getRandomColor(stringInput: string) {
    const h = [...stringInput].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const s = 95,
        l = 35 / 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
            .toString(16)
            .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function Component() {
    const evtGitHubPickerAction = useConst(() =>
        Evt.create<UnpackEvt<GitHubPickerProps["evtAction"]>>(),
    );

    const [tags, setTags] = useState([
        "oauth",
        "sso",
        "datascience",
        "office",
        "docker",
    ]);

    const [selectedTags, setSelectedTags] = useState(["oauth", "docker"]);

    const buttonRef = useStateRef<HTMLButtonElement>(null);

    const onSelectedTags = useConstCallback<
        GitHubPickerProps["onSelectedTags"]
    >(params => {
        if (params.isSelect && params.isNewTag) {
            setTags([params.tag, ...tags]);
        }

        setSelectedTags(
            params.isSelect
                ? [...selectedTags, params.tag]
                : selectedTags.filter(tag => tag !== params.tag),
        );
    });

    const { t } = useTranslation({ "Picker": null });

    return (
        <div style={{ "minHeight": 400 }}>
            {selectedTags.map(tag => (
                <span key={tag}>{tag}&nbsp;</span>
            ))}
            <br />
            <Button
                ref={buttonRef}
                onClick={() =>
                    evtGitHubPickerAction.post({
                        "action": "open",
                        "anchorEl":
                            (assert(buttonRef.current !== null),
                            buttonRef.current),
                    })
                }
            >
                open
            </Button>
            <GitHubPicker
                tags={tags}
                selectedTags={selectedTags}
                onSelectedTags={onSelectedTags}
                evtAction={evtGitHubPickerAction}
                getTagColor={getTagColor}
                texts={{
                    "label": t("github picker label"),
                    "create tag": ({ tag }) =>
                        t("github picker create tag", { tag }),
                    "done": t("github picker done"),
                }}
            />
        </div>
    );
}

export const VueDefault = getStory({});
