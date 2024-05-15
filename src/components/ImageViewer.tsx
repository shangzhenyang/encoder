import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setImageInfo } from "@/redux/reducers/app";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { t } from "i18next";

function ImageViewer(): JSX.Element {
	const dispatch = useAppDispatch();
	const imageInfo = useAppSelector((state) => {
		return state.app.imageInfo;
	});

	const closeDialog = (): void => {
		dispatch(setImageInfo({}));
	};

	console.log("imageInfo", imageInfo);

	return (
		<Modal
			className="w-fit min-w-48"
			isOpen={!!imageInfo.src}
			onClose={closeDialog}
		>
			<ModalContent>
				<ModalHeader>
					{t("imageViewer")}
				</ModalHeader>
				<ModalBody className="pb-6 pt-0">
					<img src={imageInfo.src} alt={imageInfo.alt} />
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}

export default ImageViewer;
