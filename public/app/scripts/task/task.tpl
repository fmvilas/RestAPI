<% if( typeof picture === 'string' && picture.length > 0 ) { %>
  <div class="task-picture" style="background-image: url(<%- picture %>);"></div>
<% } %>
</div>

<div class="front color-responsive">
  <h2><%- title %></h2>

  <p class="view-description"></p>

  <% if( date ) { %>
    <div class="view-date-time"><%- formatted_date %></div>
  <% } %>

  <core-toolbar class="toolbar">
    <paper-icon-button icon="editor:mode-edit" class="icon-button button-edit color-responsive"></paper-icon-button>
    <paper-icon-button icon="delete" class="icon-button button-destroy color-responsive"></paper-icon-button>
    <span flex></span>
    <div class="time-labels">
      <% if( formatted_updated_at !== formatted_created_at ) { %>
      <div class="label-updated">Last updated at <%- formatted_updated_at %></div>
      <% } else { %>
      <div class="label-updated" style="visibility: hidden;">Last updated at <%- formatted_updated_at %></div>
      <% } %>
      <div class="label-created">Created at <%- formatted_created_at %></div>
    </div>
  </core-toolbar>
</div>

<div class="edit-area form-horizontal back">
  <% if( typeof picture === 'string' && picture.length > 0 ) { %>
    <div class="file-input-wrapper has-picture animated">
      <div class="picture-add-wrapper animated">
        <paper-icon-button icon="file-upload" class="icon-button button-picture-add"></paper-icon-button>
      </div>
      <div class="picture-preview animated" style="background-image: url(<%- picture %>);"></div>
      <input type="file" accept="image/*" class="edit-picture" tabindex="-1">
      <paper-icon-button icon="clear" class="icon-button button-picture-remove"></paper-icon-button>
    </div>
  <% } else { %>
    <div class="file-input-wrapper animated">
      <div class="picture-add-wrapper animated">
        <paper-icon-button icon="file-upload" class="icon-button button-picture-add"></paper-icon-button>
      </div>
      <div class="picture-preview animated"></div>
      <input type="file" accept="image/*" class="edit-picture" tabindex="-1">
      <paper-icon-button icon="clear" class="icon-button button-picture-remove"></paper-icon-button>
    </div>
  <% } %>

  <div class="controls-wrapper block">
    <paper-input class="input input-title color-responsive animated" floatingLabel label="What's next?" value="<%- title %>"></paper-input>
    <paper-input class="input input-description color-responsive animated" floatingLabel multiline rows="3" label="Enter a description here..." value="<%- description %>"></paper-input>

    <% if( date ) { %>
      <core-toolbar class="selected-date-time toolbar color-responsive" data-date="<%- date %>">
        <span class="datetime"><%- formatted_date %></span>
        <paper-icon-button icon="clear" class="icon-button button-date-remove"></paper-icon-button>
      </core-toolbar>
    <% } else {%>
      <core-toolbar class="selected-date-time toolbar color-responsive hidden">
        <span class="datetime"></span>
        <paper-icon-button icon="clear" class="icon-button button-date-remove"></paper-icon-button>
      </core-toolbar>
    <% } %>

    <div class="task-toolbar animated">
      <div class="color-selector animated">
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="white"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="turquoise"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="emerald"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="peter-river"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="amethyst"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="wet-asphalt"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="green-sea"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="nephritis"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="belize-hole"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="wisteria"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="midnight-blue"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="sun-flower"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="carrot"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="alizarin"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="orange"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="pumpkin"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="pomegranate"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="clouds"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="concrete"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="silver"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="asbestos"></paper-icon-button>
        <paper-icon-button class="color-selector-item paper-shadow paper-shadow-bottom-z-1" data-color="black"></paper-icon-button>
      </div>
    </div>

    <core-toolbar class="toolbar">
      <input type="text" class="task-datetime">
      <paper-icon-button icon="device:access-time" class="icon-button button-time color-responsive"></paper-icon-button>
      <paper-icon-button icon="image:palette" class="icon-button button-color color-responsive"></paper-icon-button>
      <paper-icon-button icon="image:image" class="icon-button button-picture color-responsive"></paper-icon-button>
      <span flex></span>
      <paper-button label="Cancel" class="button button-cancel"></paper-button>
      <paper-button label="Save" class="button-primary button-save"></paper-button>
    </core-toolbar>
  </div>
</div>
