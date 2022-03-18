interface IWarningElementHandler {
  message: string,
  containerElement: HTMLElement | null,
  tagName: string,
  tagClassName: string,
  textTagClassName: string,
}

export const warningElementHandler = ({
  message,
  containerElement,
  tagName,
  tagClassName,
  textTagClassName,
}: IWarningElementHandler): void => {
  if (!containerElement) {
    return;
  }

  containerElement.insertAdjacentHTML(
    'afterbegin',
    `<${tagName.toLocaleLowerCase()} class=${tagClassName}>
      <span class=${textTagClassName}>${message}</span>
    </${tagName.toLocaleLowerCase()}>`,
  );
};
