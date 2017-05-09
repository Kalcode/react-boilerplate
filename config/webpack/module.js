import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'

const loaders = [
  {
    test: /\.js$/,
    loaders: ['babel-loader'],
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    loaders: ['json-loader'],
  },
  {
    test: /\.css$/,
    include: /node_modules/,
    loaders: ['style-loader', 'css-loader'],
  },
  {
    test: /\.(mp4|eot|svg|ttf|woff|woff2)$/,
    loaders: ['file-loader'],
  },
]

export const development = {
  loaders: [
    {
      test: /\.s?css$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&camelCase&sourceMap&localIdentName=[path]-[local]-[hash:base64:5]',
        'postcss-loader',
        'sass-loader?sourceMap',
        'wrap-loader?scss',
      ],
    },
    {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'url-loader?limit=1&name=[name]-[hash].[ext]',
      ],
    },
    ...loaders,
  ],
}
export const production = {
  loaders: [
    {
      test: /\.s?css$/,
      exclude: /node_modules/,
      loaders: ExtractTextWebpackPlugin.extract({
        use: [
          'css-loader?modules&camelCase&-autoprefixer&importLoaders=2&minimize',
          'postcss-loader',
          'sass-loader',
          'wrap-loader?scss',
        ],
      }),
    },
    {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'url-loader?limit=1&name=[name]-[hash].[ext]',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: {
              progressive: true,
            },
            optipng: {
              optimizationLevel: 7,
            },
            gifsicle: {
              interlaced: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    },
    ...loaders,

  ],
}
