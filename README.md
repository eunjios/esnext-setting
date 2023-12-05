# Babel과 Webpack으로 ES6+/ES.NEXT 개발 환경 구축하기

## Why Babel and Webpack?

**트랜스파일러 Babel**

- 구형 브라우저에서도 최신 ES 사양을 동작시킬 수 있음

**모듈 번들러 Webpack**

- 파일 단위로 JS 모듈을 관리하기 위해 필요
- 그 외에도 성능 개선, 웹 서버 배포 시 용이

<br />

## Babel 설정

### Installation

```
npm install --save-dev @babel/core @bable/cli
```

```
npm install --save-dev @babel/preset-env
```

### Config 파일 작성

**babel.config.json**

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 명령어 등록

**package.json**

```json
{
  // 중략
  "scripts": {
    "build": "babel src -w -d dist"
  }
}
```

- src 폴더의 파일을 트랜스파일링한 후, 그 결과를 dist 폴더에 저장
- `-w` : 타깃 폴더의 변경을 감지하여 자동으로 트랜스파일링
- `-d` : 트랜스파일링 결과물이 저장되는 폴더

<br />

## Webpack 설정

### Installation

**Webpack**

```
npm install --save-dev webpack webpack-cli
```

**Babel loader**

> Webpack 모듈 번들링 시 Babel을 사용하여 트랜스파일링 하게 함

```
npm install --save-dev babel-loader
```

**Babel polyfill**

> ES5 사양으로 대체할 수 없는 기능도 사용할 수 있게 함

```
npm install @babel/polyfill
```

### 명령어 수정

**package.json**

```json
{
  // 중략
  "scripts": {
    "build": "webpack -w"
  }
}
```

### Config 파일 작성

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devtool: 'source-map',
  mode: 'development',
};
```

**Entry**

- 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점
- `@babel/polyfill` 도 `entry` 배열에 추가

**Output**

- 웹팩을 돌리고 번들링된 js 파일의 이름 (`filename`) 과 저장 경로 (`path`) 지정
- `filename` 에 모듈 ID나 고유 해시 값을 붙이는 옵션 등 다양한 옵션이 있음

**Loader 설정**

- `rules` 배열에 각 로더마다 객체 추가
- `test` : 로더를 적용할 파일 유형 (정규 표현식)
- `use` : 해당 파일에 적용할 로더의 이름

<br />

## References

- [모던 자바스크립트 Deep Dive - 저자 이웅모]()
- [웹팩 핸드북 - 캡틴 판교](https://joshua1988.github.io/webpack-guide/concepts/overview.html)
