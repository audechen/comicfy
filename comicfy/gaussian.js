(function(imageproc) {
    "use strict";

    /*
     * Apply a Gaussian filter to the input data
     */
    imageproc.gaussianBlur = function(inputData, outputData, size) {
        /* Calculate the sigma value */
        var sigma = 0.25 * size;
        var center = (size - 1) / 2;

        /* Make the row/column matrix */
        var rowMatrix = [];
        for(var i=0; i<size; i++){
            rowMatrix[i] = 1 / Math.sqrt(2 * Math.PI * sigma * sigma) * Math.exp(-(i-center) * (i-center) / (2 * sigma * sigma));
        }

        /* Create the kernel */
        var kernel = [];
        var divisor = 0;
        for(var i=0; i<size; i++){
            kernel[i] = [];
            for(var j=0; j<size; j++){
                kernel[i][j] = rowMatrix[i] * rowMatrix[j];
                divisor += kernel[i][j];
            }
        }
        

        /***** DO NOT REMOVE - for marking *****/
        var line = "";
        console.log("Row matrix:");
        for (var i = 0; i < size; i++)
            line += rowMatrix[i] + " ";
        console.log(line);

        console.log("Kernel:");
        for (var j = 0; j < size; j++) {
            line = "";
            for (var i = 0; i < size; i++) {
                line += kernel[j][i] + " ";
            }
            console.log(line);
        }
        console.log("Divisor: " + divisor);
        /***** DO NOT REMOVE - for marking *****/

        var halfSize = Math.floor(size / 2);

        /* Apply the gaussian filter */
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {
                var sumR = 0, sumG = 0, sumB = 0;

                /* Sum the product of the kernel on the pixels */
                for (var j = -halfSize; j <= halfSize; j++) {
                    for (var i = -halfSize; i <= halfSize; i++) {
                        var pixel =
                            imageproc.getPixel(inputData, x + i, y + j);
                        var coeff = kernel[j + halfSize][i + halfSize];

                        sumR += pixel.r * coeff;
                        sumG += pixel.g * coeff;
                        sumB += pixel.b * coeff;
                    }
                }

                /* Set the averaged pixel to the output data */
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = sumR / divisor;
                outputData.data[i + 1] = sumG / divisor;
                outputData.data[i + 2] = sumB / divisor;
            }
        }
    }
 
}(window.imageproc = window.imageproc || {}));
