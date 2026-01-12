/**
 * External dependencies.
 */
import { useState, useRef, cloneElement } from 'react';
import {
	useFloating,
	useDismiss,
	useRole,
	useClick,
	useInteractions,
	FloatingFocusManager,
	FloatingOverlay,
	FloatingPortal
} from '@floating-ui/react';

/**
 * Internal dependencies.
 */
import Button from '@/components/button/button';
import { HStack, VStack } from '@/components/stack/stack';

function ConfirmationModal(props) {
	const { description, trigger, confirmButtonText, onConfirmation } = props;

	const [isOpen, setIsOpen] = useState(false);

	const { refs, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen
	});
	
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context),
		useRole(context),
		useDismiss(context, { outsidePressEvent: 'mousedown' })
	]);
	
	const triggerRef = useRef();
	
	return (
		<>
			{cloneElement(
				trigger,
				getReferenceProps({
					ref: triggerRef,
					...trigger.props,
				})
			)}

			<FloatingPortal >
				{isOpen && (
					<FloatingOverlay lockScroll className="confirmation-modal">
						<FloatingFocusManager context={context} returnFocus={false}>
							<div
								className="confirmation-modal__content"
								ref={refs.setFloating}
								{...getFloatingProps()}
							>
								<VStack gap="20" align="stretch">
									<p>{description}</p>

									<HStack 
										gap="16" 
										justify="flex-end" 
										align="flex-end"
									>
										<Button 
											variant="plain"
											danger
											onClick={() => {
												onConfirmation();
												setIsOpen(false);
											}}
										>
											{confirmButtonText ? confirmButtonText : 'Confirm'}
										</Button>

										<Button onClick={() => setIsOpen(false)}>Cancel</Button>
									</HStack>
								</VStack>
							</div>
						</FloatingFocusManager>
					</FloatingOverlay>
				)}
			</FloatingPortal>
		</>
	);
}

export default ConfirmationModal;