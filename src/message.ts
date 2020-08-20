export type FlatValue = string | number | boolean | null;

export function reduceIndent(message: string){
  const starting_indent = /^\n( *)/.exec(message);

  if(starting_indent){
    const common_indent = 
      new RegExp("\n" + starting_indent[1], "g");
      
    message = message.replace(common_indent, "\n");
  };

  message = message.replace(/^\n/, "");
  message = message.replace(/\s*\n*$/, "");
  
  return message;
}

export function createMessageFactory(template: string){
  const numberedInsert = /\{(?=\d+\})/;
  const prependContent = /(\d+)\}(.*)/s;

  const message = [] as (string | number)[];
  
  template = reduceIndent(template);

  for(const segment of template.split(numberedInsert)){
    const ammend = prependContent.exec(segment);

    if(ammend)
      message.push(parseInt(ammend[1]), ammend[2]);
    else
      message.push(segment);
  }
  
  return (...values: FlatValue[]) => {
    const chunks = message.map(slice => (
      typeof slice == "string"
        ? slice : values[slice - 1] 
    ))
    
    return chunks.join("");
  }
}