import { showDialog } from "@/utils";
import {
	faBars,
	faCircleInfo,
	faDownload,
	faFolderOpen,
	faStar,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Key } from "@heroui/react";
import { Button, Dropdown, Kbd, Label, Separator } from "@heroui/react";
import { t } from "i18next";
import type { JSX } from "react";

interface MenuProps {
	exportAsFile: () => void;
	openLocalFile: () => void;
}

function Menu({ exportAsFile, openLocalFile }: MenuProps): JSX.Element {
	const isIos =
		navigator.userAgent.includes("iPhone") ||
		navigator.userAgent.includes("iPad");
	const isMac = navigator.userAgent.includes("Macintosh");

	const actions: Record<string, () => void> = {
		about: (): void => {
			showDialog("Developed by Shangzhen Yang.", {
				title: t("about"),
			});
		},
		authorsPortfolio: (): void => {
			window.open("https://www.yangshangzhen.com/");
		},
		exportAsFile: exportAsFile,
		importFromLocalFile: openLocalFile,
		starOnGithub: (): void => {
			window.open("https://github.com/shangzhenyang/encoder");
		},
	};
	const menuItems = [
		[
			{
				icon: faFolderOpen,
				id: "importFromLocalFile",
				shortcut: isIos || isMac ? "⌘O" : "Ctrl+O",
			},
			{
				icon: faDownload,
				id: "exportAsFile",
				shortcut: isIos || isMac ? "⌘S" : "Ctrl+S",
			},
		],
		[
			{
				icon: faStar,
				id: "starOnGithub",
				shortcut: null,
			},
			{
				icon: faUser,
				id: "authorsPortfolio",
				shortcut: null,
			},
			{
				icon: faCircleInfo,
				id: "about",
				shortcut: null,
			},
		],
	];
	const sectionElements = menuItems.flatMap((items, index) => {
		const itemElements = items.map((item) => {
			const shortcutElement = item.shortcut ? (
				<Kbd
					className="ms-auto"
					slot="keyboard"
					variant="light"
				>
					<Kbd.Content>{item.shortcut}</Kbd.Content>
				</Kbd>
			) : null;

			return (
				<Dropdown.Item
					id={item.id}
					key={item.id}
					textValue={t(item.id)}
				>
					<FontAwesomeIcon
						aria-hidden="true"
						icon={item.icon}
					/>
					<Label>{t(item.id)}</Label>
					{shortcutElement}
				</Dropdown.Item>
			);
		});

		const sectionElement = (
			<Dropdown.Section key={`section-${index}`}>
				{itemElements}
			</Dropdown.Section>
		);
		if (index === 0) {
			return [sectionElement];
		}
		return [<Separator key={`separator-${index}`} />, sectionElement];
	});

	const handleMenuAction = (key: Key): void => {
		actions[String(key)]?.();
	};

	return (
		<Dropdown>
			<Button
				aria-label={t("menu")}
				isIconOnly
				variant="secondary"
			>
				<FontAwesomeIcon
					icon={faBars}
					size="lg"
				/>
			</Button>
			<Dropdown.Popover>
				<Dropdown.Menu onAction={handleMenuAction}>
					{sectionElements}
				</Dropdown.Menu>
			</Dropdown.Popover>
		</Dropdown>
	);
}

export default Menu;
