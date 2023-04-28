class ProjectTemplate {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; //where we're going to render our element tp
  element: HTMLFormElement;

  constructor() {
    // ACCESS THE HTML ELEMENTS
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    // ! as HTMLTemplateElement - assure TS that the element is going to be available and that it will be of Type HTMLTemplateElement
    // TYPE CASTING
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // RENDER THE ELEMENTS
    // import the content of the templateElement(form) and render it to the dom

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;

    this.attach(); //call the private method so that its code also executes
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const firstProject = new ProjectTemplate();
