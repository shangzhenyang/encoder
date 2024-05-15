import { useAppDispatch } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import { handleKeyboardClick } from "@/utils";
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

	const menuItems = [
		[
			{
				icon: faFolderOpen,
				onClick: (): void => {
					openLocalFile();
				},
				shortcut: isMac ? "⌘O" : "Ctrl+O",
				title: t("importFromLocalFile"),
			},
			{
				icon: faDownload,
				onClick: (): void => {
					exportAsFile();
				},
				shortcut: isMac ? "⌘S" : "Ctrl+S",
				title: t("exportAsFile"),
			},
		],
		[
			{
				icon: faStar,
				onClick: (): void => {
					window.open("https://github.com/shangzhenyang/encoder");
				},
				shortcut: null,
				title: t("starOnGithub"),
			},
			{
				icon: faUser,
				onClick: (): void => {
					window.open("https://www.yangshangzhen.com/");
				},
				shortcut: null,
				title: t("authorsPortfolio"),
			},
			{
				icon: faCircleInfo,
				onClick: (): void => {
					dispatch(setAlertMessage({
						text: "Developed by Shangzhen Yang.",
						title: t("about"),
					}));
				},
				shortcut: null,
				title: t("about"),
			},
		],
	];
	const sectionElements = menuItems.map((items, index) => {
		const itemElements = items.map(({ shortcut, title, icon, onClick }) => {
			return (
				<DropdownItem
					key={title}
					onClick={onClick}
					onKeyDown={handleKeyboardClick(onClick)}
					shortcut={shortcut}
					startContent={
						<FontAwesomeIcon
							icon={icon}
							fixedWidth
							aria-label="icon"
						/>
					}
					textValue={title}
				>
					<span>{title}</span>
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

	return (
		<Dropdown>
			<DropdownTrigger>
				<Button>
					<FontAwesomeIcon icon={faBars} size="xl" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu className="pt-3" aria-label={t("menu")}>
				{sectionElements}
			</DropdownMenu>
		</Dropdown>
	);
}

export default Menu;
