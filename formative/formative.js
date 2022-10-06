class OptionsContent {
  static html = `<h3 style="text-align: left">Overview</h3>
    <p><strong>MARKING: Complete / Incomplete</strong></p>
    <p dir="ltr">
        To complete this activity, create something that demonstrates your understanding of a concept or process you've learned about. Options are presented in tabs below.
    </p>
    <!-- TABS -->
    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true" tabindex="0">H5P</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" tabindex="-1">Infographic</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false" tabindex="-1">Contribute to Book Chapter</a>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 style="margin-top: 10px">H5P</h3>
            <p style="margin-top: 10px">Use H5P create a mini-game (quiz item) to test other students on the topics covered in this section of the unit. This can be about terminology, a scenario-based activity, or anything you'd like to create!
            </p>
            <p>
                <strong>NOTE: </strong>This activity requires you to explore the H5P tool and explore on your own, and may require more time and effort than other activities.
            </p>
            <h3>How to complete this Task</h3>
            <img src="https://edtech.une.edu.au/h5pstudio/wp-content/uploads/sites/3/2022/03/H5PCreate.png" alt="Add Tags" width="200" height="314" class="img-responsive atto_image_button_right">

            <ol>
                <li>
                    Go to our
                    <a href="https://edtech.une.edu.au/h5pstudio/" target="_blank">H5P Studio</a>&nbsp;site and log in.
                </li>
                <li>
                    Check out the H5P examples to get an idea of what activities are possible
                </li>
                <li>
                    Create an interactive activity using H5P as outlined on that page.
                </li>
                <li>When adding your discussion topic below, use the &lt;/&gt; button in the text editor to
                    <a href="https://edtech.une.edu.au/h5pstudio/sharing/" target="_blank">insert your Embed Code</a> from your H5P activity
                </li>
            </ol>

            <p>
                <strong>REMEMBER:&nbsp;</strong>You're encouraged to share your creations with the world!<br>
            </p>
            <ol>
                <li>
                    <a href="https://edtech.une.edu.au/h5pstudio/sharing/" target="_blank">Edit Copyright</a>&nbsp;- to let others know how you'd like them to use it.
                </li>
                <li>
                    If you add an 'edit' tag to your creation, this is a message to your instructor that they're free to add it to learning materials so that other students can learn from it 👍
                </li>
            </ol>
        </div>

        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <h3 style="margin-top: 10px">Infographic</h3>
            <p style="margin-top: 10px">Create an Educational Infographic using Canva or a similar tool.
            </p>

            <h3>How to Complete this Activity</h3>
            <ol>
                <li>
                    Go to Canva.com (or another graphic design tool you're comfy with)
                </li>
                <li>
                    Learn more about
                    <a href="https://www.canva.com/learn/how-to-make-an-infographic/" target="_blank">how to create infographics</a>
                </li>
                <li>
                    Create an infographic that visually represents a complex idea you learned about in this section of the unit.
                </li>
            </ol>
        </div>
        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
            <h3 style="margin-top: 10px">Contribute to Book Chapter</h3>
            <p style="margin-top: 10px">After reading through the learning materials for this section of the unit, consider what was missing and what you'd like to add.
            </p>
            <p>
                This might involve specific application to your area (e.g., early childhood, TAFE, ADF, etc.), so feel free to think about what you'd like to learn about that wasn't captured. Feel free to write more materials (with academic references), include some
                pictures or a video to illustrate something that you'd like other students to learn about.
            </p>
            <h3>How to Complete this Activity</h3>
            <ol>
                <li>
                    Think about what you'd like to add to the chapter for this section of the unit.
                </li>
                <li>
                    Create your section - it should be a couple of paragraphs with at least one visual and 2 references.
                </li>
                <li>Share it in this forum.</li>
            </ol>
        </div>
    </div>

    <hr>
    <p>
        <strong>Your Post: </strong>Share your creation in this forum by clicking on <strong>Add a new discussion topic</strong> - this may involve embedding, uploading an image or linking to a video.
    </p>
    <div class="attostylesbox attostylesbox--solid attostylesbox--callout">
        It would be great to add your materials to the chapter for this section of the unit as supplementary readings so other students can enjoy them! If you're ok sharing, just say so in your post, whether you'd like your name attached or not, and which name
        you'd like to be credited as.
    </div>
    <p>
        <strong>Response:</strong>&nbsp;Feel free to ask any questions you may have (optional - you mark for this task is only for the review)
    </p>`;
}

export function setupOptions() {
  document.getElementsByClassName("container")[0].innerHTML =
    OptionsContent.html;
}
