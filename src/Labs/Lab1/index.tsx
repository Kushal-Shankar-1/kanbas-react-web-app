import React from "react";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      {/* Lab title */}
      <h2>Lab 1</h2>

      {/* HTML Examples section */}
      <h3>HTML Examples</h3>

      {/* Heading Tags section */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        <p>
          Text documents are often broken up into several sections and
          subsections. Each section is usually prefaced with a short title or
          heading that attempts to summarize the topic of the section it
          precedes. For instance, this paragraph is preceded by the heading
          "Heading Tags."
        </p>
      </div>

      {/* Paragraph Tag section */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers to render the gaps.
        </p>
      </div>

      {/* List Tags section */}
      <div id="wd-lists">
        <h4>List Tags</h4>

        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        <h5>My Favorite Recipe</h5>
        My favorite recipe:
        <ol id="wd-your-favorite-recipe">
          <li>Preheat the oven.</li>
          <li>Prepare the ingredients.</li>
          <li>Mix ingredients in a bowl.</li>
          <li>Bake for 30 minutes.</li>
          <li>Let it cool and serve.</li>
        </ol>

        {/* Unordered List for favorite books */}
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order):
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>

        {/* Unordered List for your favorite books */}
        Your favorite books (in no particular order):
        <ul id="wd-your-books">
          <li>Harry Potter</li>
          <li>The Alchemist</li>
          <li>The Art of Money</li>
        </ul>
      </div>

      {/* Table Tags section */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>React</td>
              <td>2/24/21</td>
              <td>88</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>Node.js</td>
              <td>3/3/21</td>
              <td>92</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>Express.js</td>
              <td>3/10/21</td>
              <td>87</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>MongoDB</td>
              <td>3/17/21</td>
              <td>91</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>TypeScript</td>
              <td>3/24/21</td>
              <td>89</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Redux</td>
              <td>3/31/21</td>
              <td>93</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>GraphQL</td>
              <td>4/7/21</td>
              <td>94</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Image Tags section */}
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet:
        <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship"
        />
        <br />
        Loading a local image:
        <br />
        <img id="wd-teslabot" src="/images/teslabot.jpg" height="200px" alt="Tesla Bot" />
      </div>

      {/* Form Elements section */}
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>

          <label htmlFor="wd-text-fields-username">Username:</label>
          <input id="wd-text-fields-username" placeholder="jdoe" /> <br />

          <label htmlFor="wd-text-fields-password">Password:</label>
          <input type="password" id="wd-text-fields-password" value="123@#$asd" />
          <br />

          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" id="wd-text-fields-first-name" title="John" /> <br />

          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input
            type="text"
            id="wd-text-fields-last-name"
            placeholder="Doe"
            value="Wonderland"
            title="The last name"
          />
        </form>

        {/* Textareas section */}
        <h5>Text boxes</h5>
        <label>Biography:</label><br/>
        <textarea id="wd-textarea" cols={30} rows={10}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </textarea>

        {/* Buttons section */}
        <h5 id="wd-buttons">Buttons</h5>
        <button id="wd-all-good" onClick={() => alert("Life is Good!")} type="button">
          Hello World!
        </button>

        {/* File upload section */}
        <h5>File upload</h5>
        <input id="wd-upload" type="file"/>

        {/* Radio buttons section */}
        <h5 id="wd-radio-buttons">Radio buttons</h5>
        <label>Favorite movie genre:</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-comedy"/>
        <label htmlFor="wd-radio-comedy">Comedy</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-drama"/>
        <label htmlFor="wd-radio-drama">Drama</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-scifi"/>
        <label htmlFor="wd-radio-scifi">Science Fiction</label><br />
        <input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
        <label htmlFor="wd-radio-fantasy">Fantasy</label>

        {/* Checkboxes section */}
        <h5 id="wd-checkboxes">Checkboxes</h5>
        <label>Favorite movie genre:</label><br/>
        <input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
        <label htmlFor="wd-chkbox-comedy">Comedy</label><br/>
        <input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
        <label htmlFor="wd-chkbox-drama">Drama</label><br/>
        <input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
        <label htmlFor="wd-chkbox-scifi">Science Fiction</label><br/>
        <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
        <label htmlFor="wd-chkbox-fantasy">Fantasy</label>

        {/* Dropdowns section */}
        <h4 id="wd-dropdowns">Dropdowns</h4>
        <h5>Select one</h5>
        <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
        <select id="wd-select-one-genre">
          <option value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option selected value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        <h5>Select many</h5>
        <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
        <select id="wd-select-many-genre" multiple>
          <option selected value="COMEDY">Comedy</option>
          <option value="DRAMA">Drama</option>
          <option selected value="SCIFI">Science Fiction</option>
          <option value="FANTASY">Fantasy</option>
        </select>

        {/* Other HTML field types section */}
        <h4>Other HTML field types</h4>
        <label htmlFor="wd-text-fields-email"> Email: </label>
        <input type="email" placeholder="jdoe@somewhere.com" id="wd-text-fields-email"/><br/>

        <label htmlFor="wd-text-fields-salary-start"> Starting salary: </label>
        <input type="number" id="wd-text-fields-salary-start" placeholder="1000" value="100000"/><br/>

        <label htmlFor="wd-text-fields-rating"> Rating: </label>
        <input type="range" id="wd-text-fields-rating" max="5" value="4"/><br/>

        <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
        <input type="date" id="wd-text-fields-dob" value="2000-01-21"/><br/>
      </div>
      <div id="wd-anchors">
        <h4>Anchor Tag</h4>
        Please
        <a id="wd-lipsum" href="https://www.lipsum.com" target="_blank" rel="noreferrer">
        click here
        </a>
        to get dummy text
        <br />
  
        Check out another page within this website:
        <a href="/Kanbas" target="_self">Go to Kanbas</a>
        <br />

        View the source code repository on GitHub:
        <a id="wd-github" href="https://github.com/Kushal-Shankar-1/kanbas-react-web-app" target="_blank" rel="noreferrer">
        GitHub Repository
        </a>
      </div>
    </div>
  );
}