import { useAppDispatch } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import {
	faBars,
	faCircleInfo,
	faDownload,
	faFolderOpen,
	faStar,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { t } from "i18next";
import { Key } from "react";

interface MenuProps {
	exportAsFile: () => void;
	openLocalFile: () => void;
}

function Menu({
	exportAsFile,
	openLocalFile,
}: MenuProps): JSX.Element {
	const dispatch = useAppDispatch();

	const isMac = navigator.userAgent.includes("Macintosh");

	const actions: Record<string, () => void> = {
		about: (): void => {
			dispatch(setAlertMessage({
				text: "Developed by Shangzhen Yang.",
				title: t("about"),
			}));
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
				shortcut: isMac ? "⌘O" : "Ctrl+O",
			},
			{
				icon: faDownload,
				id: "exportAsFile",
				shortcut: isMac ? "⌘S" : "Ctrl+S",
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
	const sectionElements = menuItems.map((items, index) => {
		const itemElements = items.map(({ icon, id, shortcut }) => {
			return (
				<DropdownItem
					key={id}
					shortcut={shortcut}
					startContent={
						<FontAwesomeIcon
							icon={icon}
							fixedWidth
							aria-label="icon"
						/>
					}
					textValue={t(id)}
				>
					<span>{t(id)}</span>
				</DropdownItem>
			);
		});

		return (
			<DropdownSection
				key={index}
				showDivider={index !== menuItems.length - 1}
			>
				{itemElements}
			</DropdownSection>
		);
	});

	const handleMenuAction = (key: Key): void => {
		actions[key as string]?.();
	};

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button>
					<FontAwesomeIcon icon={faBars} size="xl" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu
				aria-label={t("menu")}
				className="pt-3"
				onAction={handleMenuAction}
			>
				{sectionElements}
			</DropdownMenu>
		</Dropdown>
	);
}

export default Menu;
