<template>
    <div class="background">
        <canvas ref="canvas"></canvas>
    </div>
</template>

<style lang="scss" scoped>
.background {
    width: 100%;
    height: 100%;
}
</style>

<script>
export default {
    mounted ( ) {

        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Set waves opacities
        const wavesOpacities = [0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

        // Set parameters
        const params = {
            AMPLITUDE_WAVES: canvas.height,
            AMPLITUDE_MIDDLE: canvas.height / 3,
            AMPLITUDE_SIDES: canvas.height / 2,
            OFFSET_SPEED: 120,
            SPEED: 3,
            OFFSET_WAVES: 15,
            NUMBER_WAVES: 3,
            COLOR: ['#032bac','#8a280b','#ff9acc'],
            NUMBER_CURVES: 2,
            OFFSET_CURVE: true,
            RESET: false
        };
        let speedInc = 0;

        // Render

        const render = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // For each wave
            for ( let j = params.NUMBER_WAVES - 1; j >= 0; j-- ) {
                // offset between waves
                let offset = j * Math.PI * params.OFFSET_WAVES;

                // Color and increase gradually opacity
                ctx.fillStyle = params.COLOR[ j ];

                ctx.globalAlpha = wavesOpacities[ j ];


                let leftRange = ((Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_SIDES) + (canvas.height - params.AMPLITUDE_SIDES) / 2;
                let rightRange = ((Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_SIDES) + (canvas.height - params.AMPLITUDE_SIDES) / 2;

                let leftCurveRange = (Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;
                let rightCurveRange = (Math.sin((offset / params.OFFSET_SPEED) + 1) + 1) / 2 * params.AMPLITUDE_WAVES + (canvas.height - params.AMPLITUDE_WAVES) / 2;


                let endCurveRange = ((Math.sin((offset / params.OFFSET_SPEED) + 2) + 1) / 2 * params.AMPLITUDE_MIDDLE) + (canvas.height - params.AMPLITUDE_MIDDLE) / 2;

                let reverseLeftCurveRange = endCurveRange - rightCurveRange + endCurveRange;
                let reverseRightCurveRange = endCurveRange - leftCurveRange + endCurveRange;

                if (params.OFFSET_CURVE === false) {
                    leftCurveRange = rightCurveRange;
                    reverseRightCurveRange = reverseLeftCurveRange;

                }


                ctx.beginPath();

                ctx.moveTo(0, leftRange);


                ctx.bezierCurveTo(canvas.width / (params.NUMBER_CURVES * 3), leftCurveRange, canvas.width / (params.NUMBER_CURVES * 3 / 2), rightCurveRange, canvas.width / params.NUMBER_CURVES, endCurveRange);

                for ( let i = 1; i < params.NUMBER_CURVES; i++ ) {

                    const finalRightCurveRange = i % 2 !== 0 ? rightCurveRange : reverseRightCurveRange;
                    const finalLeftCurveRange = i % 2 !== 0 ? leftCurveRange : reverseLeftCurveRange;

                    const secondPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width / (params.NUMBER_CURVES * 3);
                    const secondPtY = endCurveRange - finalRightCurveRange + endCurveRange;
                    const thirdPtX = canvas.width * (i / params.NUMBER_CURVES) + canvas.width * (2 / (params.NUMBER_CURVES * 3));
                    const thirdPtY = endCurveRange - finalLeftCurveRange + endCurveRange;
                    const lastPtX = canvas.width * ((i + 1) / params.NUMBER_CURVES);
                    const lastPtY = i === params.NUMBER_CURVES - 1 ? rightRange : endCurveRange;

                    ctx.bezierCurveTo(secondPtX, secondPtY, thirdPtX, thirdPtY, lastPtX, lastPtY);

                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.lineTo(0, rightRange);

                ctx.closePath();
                ctx.fill();
            }

        };

        render();


    },
};
</script>
