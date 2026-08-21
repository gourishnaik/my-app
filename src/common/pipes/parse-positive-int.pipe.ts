import {
  ArgumentMetadata,   // type describing info about the argument being piped (data, metatype, type)
  BadRequestException, // thrown -> Nest turns it into an HTTP 400 response
  Injectable,          // marks this class as a provider Nest's DI container can manage
  PipeTransform,       // interface every pipe must implement
} from '@nestjs/common';

@Injectable() // lets this pipe be created/injected by Nest, and injected into other things itself if needed
export class ParsePositiveIntPipe implements PipeTransform<string, number> { // <input, output> generics: takes a string, returns a number
  transform(value: string, metadata: ArgumentMetadata): number { // value = raw ':id' string from the URL
    const val = Number(value); // <-- STRING to NUMBER conversion happens here: 'abc' -> NaN, '5' -> 5, '1.5' -> 1.5

    if (!Number.isInteger(val)) { // catches NaN AND non-whole numbers like 1.5 in one check
      throw new BadRequestException(
        `${metadata.data} must be an integer, got '${value}'`, // metadata.data = the @Param() key name, e.g. 'id'
      );
    }

    if (val <= 0) { // rejects 0 and negative numbers — ParseIntPipe alone wouldn't catch this
      throw new BadRequestException(
        `${metadata.data} must be a positive integer, got '${value}'`,
      );
    }

    return val; // whatever is returned here is what the route handler actually receives
  }
}
