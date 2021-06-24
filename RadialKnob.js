<html>

<head>
     </head>
     <style type="text/css">
     $configs: (
    chart-one: (
        svgSize: 200px,
        percentage: 25,
        strokeWidth: 1px,
        backgroundColor: #305556,
        foregroundColor: #79be9b,
        labelColor: #c6e8d7,
        labelFontSize: 2.5rem,
        duration: 3s,
    
        animationDelay: 1s
    ),
    chart-two: (
        svgSize: 200px,
        percentage: 50,
        strokeWidth: 15px,
        backgroundColor: #305556,
        foregroundColor: #d0f09e,
        labelColor: #c6e8d7,
        labelFontSize: 2.5rem,
        duration: 3s,
        animationDelay: 1s
    ),
    chart-three: (
        svgSize: 200px,
        percentage: 75,
        strokeWidth: 25px,
        backgroundColor: #305556,
        foregroundColor: #389967,
        labelColor: #c6e8d7,
        labelFontSize: 2.5rem,
        duration: 3s,
        animationDelay: 1s
    )
);


/* ------- DO NOT EDIT BELOW --------- */
$pi: 3.14;
$labelData: '';
@for $i from 0 to 101 {
    $labelData: $labelData + $i + '%' + '\a';
}

@each $chart, $param in $configs {
    
    $c: (map-get($param, svgSize) - map-get($param, strokeWidth)) * $pi;
    $cOffSet: (map-get($param, percentage)/100)*$c;
    
    .#{$chart} {
        width: map-get($param, svgSize);
        height: map-get($param, svgSize);
        margin: 0;
        position: relative;
        
        &.animate {
            svg .circle-foreground {
                animation: offset map-get($param, duration) ease-in-out forwards;
                animation-delay: map-get($param, animationDelay);
            }
            figcaption:after {
                animation: #{$chart}-label map-get($param, duration) steps(map-get($param, percentage)) forwards;
                animation-delay: map-get($param, animationDelay);
            }
        }

        svg {
            width: 100%;
            height: 100%;
            .circle-background {
                r: (map-get($param, svgSize) - map-get($param, strokeWidth))/2;
                cx: 50%;
                cy: 50%;
                fill: none;
                stroke: map-get($param, backgroundColor);
                stroke-width: map-get($param, strokeWidth);
            }
            .circle-foreground {
                @extend .circle-background;
                stroke: map-get($param, foregroundColor);
                stroke-dasharray: $cOffSet $c;
                stroke-dashoffset: $cOffSet;
                stroke-linecap: round;
                transform-origin: 50% 50%;
                transform: rotate(-90deg);
            }
        }
        figcaption {
            display: inline-block;
            width: 100%;
            height: map-get($param, labelFontSize);
            overflow: hidden;
            text-align: center;
            color: map-get($param, labelColor);
            position: absolute;
            top: calc(50% - #{map-get($param, labelFontSize)/2});
            left: 0;
            font-size: 0;
            &:after {
                display: inline-block;
                content: $labelData;
                white-space: pre;
                font-size: map-get($param, labelFontSize);
                line-height: map-get($param, labelFontSize);
            }
        }
    }
    @keyframes #{$chart}-label {
        100% {
            transform: translateY(map-get($param, labelFontSize) * (-(map-get($param, percentage))));
        }
    }
}
@keyframes offset {
    100% {
        stroke-dashoffset: 0;
    }
}


/* codepen styling only */
@import url(https://fonts.googleapis.com/css?family=Abel);
body {
    background: #272b31;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
figure {
    margin: 1rem!important;
}
figcaption {
    font-family: 'Abel', sans-serif;
}
    </style>
    <meta>
</head>

<body>

  <!-- Current work in progress - works in webkit/chrome browsers only, I'll build in more support when I eventually get round to it ;) -->

<!-- remove/add 'animate' class to control when charts animate -->
<figure class="chart-one animate">
    <svg role="img" xmlns="http://www.w3.org/2000/svg">
        <title>[title here]</title>
        <desc>[long description here]</desc>
        <circle class="circle-background"/>
        <circle class="circle-foreground"/>
    </svg>
    <figcaption>25% of all males like donuts.</figcaption>
</figure>

<figure class="chart-two animate">
    <svg role="img" xmlns="http://www.w3.org/2000/svg">
        <title>[title here]</title>
        <desc>[long description here]</desc>
        <circle class="circle-background"/>
        <circle class="circle-foreground"/>
    </svg>
    <figcaption>50% of all males like donuts.</figcaption>
</figure>

<figure class="chart-three animate">
    <svg role="img" xmlns="http://www.w3.org/2000/svg">
        <title>[title here]</title>
        <desc>[long description here]</desc>
        <circle class="circle-background"/>
        <circle class="circle-foreground"/>
    </svg>
    <figcaption>75% of all males like donuts.</figcaption>
</figure>




</body>

</html>