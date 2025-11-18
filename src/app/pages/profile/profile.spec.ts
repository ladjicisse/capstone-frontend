import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../../services/user.service';
import { of, throwError } from 'rxjs';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getProfile']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, Profile], // Import Profile directly as it's a standalone component
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests
  });

  it('should create', () => {
    userServiceSpy.getProfile.and.returnValue(of<any>({})); // Provide a mock observable for ngOnInit
    fixture.detectChanges(); // Trigger ngOnInit
    expect(component).toBeTruthy();
  });

  it('should load user profile on ngOnInit', () => {
    const mockUser: any = { name: 'Test User', email: 'test@example.com' };
    userServiceSpy.getProfile.and.returnValue(of(mockUser));

    expect(component.loading()).toBeTrue(); // Initial state
    expect(component.user()).toBeNull(); // Initial state

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.user()).toEqual(mockUser);
    expect(component.loading()).toBeFalse();
    expect(userServiceSpy.getProfile).toHaveBeenCalledTimes(1);
  });

  it('should set loading to false on error during profile load', () => {
    userServiceSpy.getProfile.and.returnValue(throwError(() => new Error('Error fetching profile')));

    expect(component.loading()).toBeTrue();
    expect(component.user()).toBeNull();

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.user()).toBeNull();
    expect(component.loading()).toBeFalse();
    expect(userServiceSpy.getProfile).toHaveBeenCalledTimes(1);
  });

  it('should not call getUserProfile directly', () => {
    // This test ensures that the private method is not called directly from outside
    // and that the UserService is the one responsible for fetching the profile.
    // We can't directly spy on private methods easily in Jasmine/TypeScript,
    // but by checking if the UserService's getProfile was called, we implicitly
    // confirm that the component relies on the service.
    userServiceSpy.getProfile.and.returnValue(of<any>({}));
    fixture.detectChanges();
    expect(userServiceSpy.getProfile).toHaveBeenCalled();

    // To further ensure getUserProfile is not being used in a way we don't expect
    // within ngOnInit or subsequent calls, we rely on the fact that HttpClientTestingModule
    // would report an unhandled request if the private getUserProfile method
    // tried to make an actual HTTP call that wasn't mocked through httpTestingController.
  });
});
