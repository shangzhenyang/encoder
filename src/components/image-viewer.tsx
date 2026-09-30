import { useStore } from "@/store";
import { Modal } from "@heroui/react";
import type { JSX } from "react";
import { useCallback } from "react";

function ImageViewer(): JSX.Element {
	const imageViewerSrc = useStore((state) => state.imageViewerSrc);
	const imageViewerTitle = useStore((state) => state.imageViewerTitle);
	const isImageViewerShown = useStore((state) => state.isImageViewerShown);

	const handleOpenChange = useCallback((isOpen: boolean) => {
		if (!isOpen) {
			useStore.setState({
				isImageViewerShown: false,
			});
		}
	}, []);

	return (
		<Modal.Backdrop
			isOpen={isImageViewerShown}
			onOpenChange={handleOpenChange}
		>
			<Modal.Container>
				<Modal.Dialog className="w-fit min-w-48">
					<Modal.CloseTrigger className="end-6 top-6" />
					<Modal.Header>
						<Modal.Heading>{imageViewerTitle}</Modal.Heading>
					</Modal.Header>
					<Modal.Body>
						<img
							alt={imageViewerTitle}
							className="w-full"
							src={imageViewerSrc}
						/>
					</Modal.Body>
				</Modal.Dialog>
			</Modal.Container>
		</Modal.Backdrop>
	);
}

export default ImageViewer;
