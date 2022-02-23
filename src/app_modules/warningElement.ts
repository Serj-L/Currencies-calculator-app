interface warningElementHandlerParams {
  message: string,
  containerElement: HTMLElement | null,
  tagName: string,
  tagClassName: string,
  textTagClassName: string,
}

export const warningElementHandler = (params: warningElementHandlerParams): void => {
  const { message,
    containerElement,
    tagName,
    tagClassName,
    textTagClassName,
  } = params;

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
