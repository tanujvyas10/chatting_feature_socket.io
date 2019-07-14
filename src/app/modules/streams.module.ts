import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from '../components/streams/streams.component';
import { TokenService } from '../services/token.service';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { PeopleComponent } from '../components/people/people.component';
import { UsersService } from '../services/users.service';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import {NgxAutoScrollModule} from "ngx-auto-scroll";
import {EmojiPickerModule} from 'ng2-emoji-picker'

@NgModule({
  declarations: [StreamsComponent,ToolbarComponent, SideComponent, PostFormComponent, PostsComponent, CommentsComponent, PeopleComponent, NotificationsComponent, ChatComponent, MessageComponent],
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule,RouterModule,NgxAutoScrollModule,EmojiPickerModule.forRoot()],
  exports:[StreamsComponent,ToolbarComponent],
  providers:[TokenService,PostService,UsersService]
})
export class StreamsModule { }
